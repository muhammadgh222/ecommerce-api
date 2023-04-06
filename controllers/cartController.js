import AppError from "../utilities/AppError.js";
import AsyncHandler from "../utilities/AsyncHandler.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import Coupon from "../models/couponModel.js";

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

export const addToCart = AsyncHandler(async (req, res, next) => {
  const { productId, color, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("There is no such a product", 404));
  }
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        { product: productId, color: color, price: product.price, quantity },
      ],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(201).json({
    status: "success",
    cart,
    numOfCartItems: cart.cartItems.length,
  });
});

export const getUserCart = AsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new AppError("Your cart is empty! Please add some products", 404)
    );
  }

  res.status(200).json({
    status: "success",
    cart,
    numOfCartItems: cart.cartItems.length,
  });
});

export const removeCartItem = AsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { product: req.params.itemId } },
    },
    { new: true }
  );

  console.log(req.params.itemId);

  console.log(cart);
  calcTotalCartPrice(cart);
  cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

export const updateCartItemQuantity = AsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const { itemId } = req.params;
  if (!cart) {
    return next(
      new AppError("Your cart is empty! Please add some products", 404)
    );
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = req.body.quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new AppError(`there is no item for this id :${itemId}`, 404));
  }
  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

export const applyCoupon = AsyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    return next(new AppError(`Coupon is invalid or expired`, 404));
  }

  const cart = await Cart.findOne({ user: req.user._id });

  const totalPrice = cart.totalCartPrice;

  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2); // 99.23

  cart.totalCartPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

export const clearCart = AsyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });

  if (!cart) {
    return next(
      new AppError("Your cart is already empty! Please add some products", 404)
    );
  }
  res.status(204).json({
    data: null,
  });
});
