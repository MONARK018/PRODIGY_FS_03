import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customer", "name email")
            .populate("items.product", "name price");

        res.json({ success: true, orders });
    } catch (error) {
        console.error("❌ Error Fetching Orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders." });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("customer", "name email")
            .populate("items.product", "name price");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error("❌ Error fetching order:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export const addOrder = async (req, res) => {
    try {
        console.log("🔎 Incoming Order Data:", req.body);

        const { items, totalAmount } = req.body;
        const customerId = req.user?.id;

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }
        if (!items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ success: false, message: "Order must contain items and total amount." });
        }

        const newOrder = new Order({
            customer: customerId,
            items,
            totalAmount,
            status: "Pending",
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error("❌ Error placing order:", error);
        res.status(500).json({ success: false, message: "Failed to place order.", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Pending", "Shipped", "Delivered"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("❌ Error Updating Order:", error);
        res.status(500).json({ success: false, message: "Error updating order." });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.status(200).json({ success: true, message: "Order deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ success: false, message: "Failed to delete order." });
    }
};

