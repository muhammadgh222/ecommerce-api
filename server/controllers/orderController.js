import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import AppError from "../utilities/AppError.js";
import AsyncHandler from "../utilities/AsyncHandler.js";
import { getAll, getOne } from "./handleFactory.js";

export const filterOrderForLoggedUser = AsyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});

export const createCashOrder = AsyncHandler(async (req, res, next) => {
  const tax = 0,
    shipping = 0;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("There is no products in your cart", 404));
  }

  const cartPrice = cart.totalCartPriceAfterDiscount
    ? cart.totalCartPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + tax + shipping;

  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOption, {});

    await Cart.findByIdAndDelete(req.params.cartId);
  }
  res.status(201).json({ status: "success", order });
});

export const getAllOrders = getAll(Order);

export const getUserOrder = getOne(Order);

export const updateOrderToPaid = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new AppError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }
  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", updatedOrder });
});

export const updateOrderToDelivered = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `There is no such a order with this id:${req.params.id}`,
        404
      )
    );
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});
