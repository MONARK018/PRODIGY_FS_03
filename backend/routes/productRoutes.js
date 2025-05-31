import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", authMiddleware, adminOnly, upload.single("image"), addProduct);

router.put("/:id", authMiddleware, adminOnly, upload.single("image"), updateProduct);

router.delete("/:id", authMiddleware, adminOnly, deleteProduct);

export default router;