import express from "express";
import {
  allorderdetails,
  cancelOrder,
  createOrder,
  // updateOrderItemQuantity,
  updateOrderStatus,
  userOrders,
} from "../controllers/Order.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/Auth.js";
const router = express.Router();

// router.get("/allorderdetails", authenticate,authorizeAdmin,allorderdetails )
router.get("/allorderdetails", authenticate, authorizeAdmin, allorderdetails);
router.put("/:orderId/status", authenticate, authorizeAdmin, updateOrderStatus);
router.post("/", authenticate, createOrder);
router.get("/user-orders", authenticate, userOrders);
router.put("/:orderId/cancel", authenticate, cancelOrder);
// router.put("/:orderId/items/:itemId", authenticate, updateOrderItemQuantity);

export default router;
