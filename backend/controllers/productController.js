import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        console.error("❌ Error Fetching Products:", error);
        res.status(500).json({ success: false, message: "Error fetching products." });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🔎 Searching for Product ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid Product ID Format:", id);
            return res.status(400).json({ success: false, message: "Invalid product ID format." });
        }
        const product = await Product.findById(id);
        if (!product) {
            console.error("❌ Product Not Found:", id);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        console.log("✅ Product Found:", product);
        res.json(product);

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const addProduct = async (req, res) => {
    try {
        console.log("✅ Received Product Data:", req.body);
        console.log("✅ Received File:", req.file);

        if (!req.body.name || !req.body.price || !req.file) {
            console.error("❌ Missing Fields:", req.body, req.file);
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: imagePath,
        });

        await newProduct.save();
        console.log("✅ Product Added Successfully:", newProduct);
        res.json({ success: true, product: newProduct });

    } catch (error) {
        console.error("❌ Error Adding Product:", error.message);
        res.status(500).json({ success: false, message: "Error adding product." });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        console.log("🔄 Updating Product ID:", id);
        console.log("📝 Updated Data Before Processing:", updatedData);

        const product = await Product.findById(id);
        if (!product) {
            console.error("❌ Product Not Found:", id);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        if (!req.file) {
            updatedData.image = product.image;
        } else {

            updatedData.image = `/uploads/${req.file.filename}`;


            console.log("📸 New Image Saved:", updatedData.image);

        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedProduct) {
            console.error("❌ Product Update Failed:", id);
            return res.status(404).json({ success: false, message: "Product update failed." });
        }

        console.log("✅ Product Updated Successfully:", updatedProduct);
        res.json({ success: true, product: updatedProduct });

    } catch (error) {
        console.error("❌ Error Updating Product:", error.message, error.stack);
        res.status(500).json({ success: false, message: "Server error.", errorDetail: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.json({ success: true, message: "Product deleted successfully!" });

    } catch (error) {
        console.error("❌ Error Deleting Product:", error);
        res.status(500).json({ success: false, message: "Error deleting product." });
    }
};