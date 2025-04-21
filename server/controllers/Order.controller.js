import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import {
  sendErrorResponse,
  sendSuccessResponse,
  validateFields,
} from "../utils/errorHandler.js";

//TODO:- CREATE NEW ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      contactNumber,
      shippingAddress,
      items,
      paymentMethod = "cod",
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "customerName",
      "email",
      "contactNumber",
      "shippingAddress",
      "items",
    ];
    const validationErrors = validateFields(req.body, requiredFields);
    if (validationErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", validationErrors);
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return sendErrorResponse(
        res,
        400,
        "At least one product is required in the order"
      );
    }

    let totalAmount = 0;
    const orderItems = [];

    // ? Oeder lene hai one by one
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return sendErrorResponse(
          res,
          404,
          `Product not found: ${item.productId}`
        );
      }

      if (product.quantity < item.quantity) {
        return sendErrorResponse(
          res,
          400,
          `Insufficient stock for product: ${product.name}. Available: ${product.quantity}`
        );
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.image,
      });

      // Update product stock
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create the order
    const order = await Order.create({
      customerName,
      email,
      contactNumber,
      shippingAddress,
      items: orderItems,
      paymentMethod,
      totalAmount,
      ...(req.user?._id && { user: req.user._id }), // Add user if logged in
    });

    const io = req.app.get("io");
    io.emit("new-order", order);
    
    return sendSuccessResponse(res, 201, "Order created successfully", {
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return sendErrorResponse(res, 500, "Failed to create order", [
      error.message,
    ]);
  }
};

//TODO:- GET ALL ORDER DETAILS
export const allorderdetails = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name price image");

    return sendSuccessResponse(res, 200, "All orders fetched successfully", {
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return sendErrorResponse(res, 500, "Failed to fetch orders");
  }
};

//TODO:- UPADTE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const io = req.app.get('io')

    const order = await Order.findById(orderId).populate('user')
    if (!order) {
      return sendErrorResponse(res, 404, "Order not found")
    }

    const oldStatus = order.orderStatus

    // Validate status
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return sendErrorResponse(res, 400, "Invalid order status")
    }

    // Handle stock for cancelled orders
    if (status === 'cancelled' && oldStatus !== 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product)
        if (product) {
          product.quantity += item.quantity
          await product.save()
        }
      }
    }

    order.orderStatus = status
    if (status === 'delivered') {
      order.deliveredAt = new Date()
    }

    await order.save()

    // Convert to plain object and add oldStatus
    const orderData = order.toObject()
    orderData.oldStatus = oldStatus

    // Notify all admin dashboards
    io.emit('order-status-changed', orderData)
    
    // Notify specific user if available
    if (order.user) {
      io.to(order.user._id.toString()).emit('user-order-updated', {
        orderId: order._id,
        status: order.orderStatus,
        message: `Your order status changed to ${order.orderStatus}`
      })
    }

    return sendSuccessResponse(res, 200, "Order status updated successfully", { order })

  } catch (error) {
    console.error("Error updating order status:", error)
    return sendErrorResponse(res, 500, "Failed to update order status")
  }
}

//TODO:- UPDATE ORDER ITEM QUANTITY
export const updateOrderItemQuantity = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { newQuantity } = req.body;

    // Validate input
    if (!newQuantity || isNaN(newQuantity) || newQuantity < 1) {
      return sendErrorResponse(
        res,
        400,
        "Please provide a valid quantity (minimum 1)"
      );
    }

    // Find the order
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return sendErrorResponse(res, 404, "Order not found");
    }

    // Check if order can be modified
    if (order.orderStatus !== "processing") {
      return sendErrorResponse(
        res,
        400,
        `Order cannot be modified in ${order.orderStatus} status`
      );
    }

    // Find the item in order
    const item = order.items.id(itemId);
    if (!item) {
      return sendErrorResponse(res, 404, "Item not found in order");
    }

    // Check product stock availability if increasing quantity
    if (newQuantity > item.quantity) {
      const product = await Product.findById(item.product);
      const quantityNeeded = newQuantity - item.quantity;

      if (product.quantity < quantityNeeded) {
        return sendErrorResponse(
          res,
          400,
          `Only ${product.quantity} items available in stock`
        );
      }

      // Update product stock
      product.quantity -= quantityNeeded;
      await product.save();
    } else if (newQuantity < item.quantity) {
      // If decreasing quantity, return stock
      const product = await Product.findById(item.product);
      const quantityReturned = item.quantity - newQuantity;

      product.quantity += quantityReturned;
      await product.save();
    }

    // Calculate price difference
    const priceDifference = (newQuantity - item.quantity) * item.price;
    item.quantity = newQuantity;
    order.totalAmount += priceDifference;

    const updatedOrder = await order.save();

    return sendSuccessResponse(
      res,
      200,
      "Order item quantity updated successfully",
      { order: updatedOrder }
    );
  } catch (error) {
    console.error("Error updating order quantity:", error);
    return sendErrorResponse(res, 500, "Internal server error", [
      error.message,
    ]);
  }
};

//TODO:- GET USER ORDERS
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    return sendSuccessResponse(res, 200, "User orders fetched successfully", {
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return sendErrorResponse(res, 500, "Failed to fetch user orders", [
      error.message,
    ]);
  }
};

//TODO:- GET ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "name email")
      .populate("items.product", "name price image");

    if (!order) {
      return sendErrorResponse(res, 404, "Order not found");
    }

    // Check if user is authorized to view this order
    if (order.user._id.toString() !== req.user._id.toString()) {
      return sendErrorResponse(res, 403, "Unauthorized to view this order");
    }

    return sendSuccessResponse(res, 200, "Order fetched successfully", {
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return sendErrorResponse(res, 500, "Failed to fetch order", [
      error.message,
    ]);
  }
};
//TODO:- CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return sendErrorResponse(res, 404, "Order not found");
    }

    // Check if user is authorized to cancel this order
    if (order.user.toString() !== req.user._id.toString()) {
      return sendErrorResponse(res, 403, "Unauthorized to cancel this order");
    }

    // Check if order can be cancelled
    if (order.orderStatus !== "processing") {
      return sendErrorResponse(
        res,
        400,
        `Order cannot be cancelled in ${order.orderStatus} status`
      );
    }

    // Return products to stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    // Update order status
    order.orderStatus = "cancelled";
    await order.save();

    return sendSuccessResponse(res, 200, "Order cancelled successfully", {
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return sendErrorResponse(res, 500, "Failed to cancel order");
  }
};
