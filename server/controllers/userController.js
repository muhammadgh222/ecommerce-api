import User from "../models/userModel.js";
import AppError from "../utilities/AppError.js";
import AsyncHandler from "../utilities/AsyncHandler.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const updateInfo = AsyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /changePassword.",
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.profilePicture = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const getProfile = AsyncHandler(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
