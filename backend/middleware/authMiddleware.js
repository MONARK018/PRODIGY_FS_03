import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        console.log("Middleware activated! Request received at:", req.url);

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Decoded Token:", req.user);
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(400).json({ success: false, message: "Invalid token." });
    }
};

export const customerOnly = (req, res, next) => {
    console.log("Checking Customer Role:", req.user?.role);

    if (!req.user || req.user.role !== "customer") {
        return res.status(403).json({ success: false, message: "Access denied. Customers only." });
    }
    next();
};

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next();

};