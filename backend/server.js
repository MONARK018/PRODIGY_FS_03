import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ Database connected successfully");

        const app = express();
        app.use(express.json());
        app.use(cors());


        app.use("/uploads", express.static(path.join(__dirname, "uploads")));

        app.use("/api/auth", authRoutes);
        app.use("/api/products", productRoutes);
        app.use("/api/orders", orderRoutes);

        app.use("/api", profileRoutes);

        app.use((req, res, next) => {
            res.status(404).json({ success: false, message: `API endpoint [${req.method} ${req.originalUrl}] not found.` });
        });

        app.use((err, req, res, next) => {
            console.error(`🚨 Server Error: ${err.message}`);
            res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();