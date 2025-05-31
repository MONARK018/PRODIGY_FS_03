import User from "../models/User.js"; 

export const getUserProfile = async (req, res) => {
    try {
        const userEmail = req.user.email;  

        if (!userEmail) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const user = await User.findOne({ email: userEmail }).select("-password"); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Error fetching profile." });
    }
};