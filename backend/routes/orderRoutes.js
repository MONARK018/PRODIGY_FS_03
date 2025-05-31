import express from "express";
import { getOrders, addOrder, updateOrderStatus, deleteOrder, getOrderById } from "../controllers/orderController.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.post("/", authMiddleware, addOrder);
router.put("/:id/status", authMiddleware, adminOnly, updateOrderStatus);
router.delete("/:id", authMiddleware, adminOnly, deleteOrder);

export default router;