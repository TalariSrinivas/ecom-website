import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
 
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// ✅ Create Order (COD) & Get All Orders (Admin)
router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate,authorizeAdmin , getAllOrders);

// ✅ Get user's orders
router.route("/mine").get(authenticate, getUserOrders);

// ✅ Stats routes
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);

// ✅ Find single order by ID
router.route("/:id").get(authenticate, findOrderById);

// ✅ Mark order as Paid (for COD after delivery confirmation)
router.route("/:id/pay").put(authenticate, authorizeAdmin, markOrderAsPaid);


// ✅ Mark order as Delivered (Admin only)
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);

export default router;
