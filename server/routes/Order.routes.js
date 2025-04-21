import express from "express";
import { 
  createOrder, 
  userOrders, 
  updateOrderItemQuantity, 
  cancelOrder, 
  allorderdetails,
  updateOrderStatus
} from "../controllers/order.controller.js";
import { adminOnly, authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/allorderdetails", authenticate,authorizeAdmin,allorderdetails )
router.get("/allorderdetails", authenticate, authorizeAdmin, allorderdetails)
router.put("/:orderId/status", authenticate, authorizeAdmin, updateOrderStatus)
router.post("/", authenticate, createOrder);
router.get("/user-orders", authenticate, userOrders);
router.put("/:orderId/items/:itemId", authenticate, updateOrderItemQuantity);
router.put("/:orderId/cancel", authenticate, cancelOrder);

export default router;