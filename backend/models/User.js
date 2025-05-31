import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);