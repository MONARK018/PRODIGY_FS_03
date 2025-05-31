import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware, adminOnly, customerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/verify-user", authMiddleware, (req, res) => {
    
    res.json({ success: true, user: req.user });
});

router.get("/verify-admin", authMiddleware, adminOnly, (req, res) => {
    res.json({ success: true, message: "Admin verified!", user: req.user });
});

router.get("/customer-dashboard", authMiddleware, customerOnly, (req, res) => {
    res.json({ success: true, message: "Welcome to the customer dashboard!" });
});

export default router;