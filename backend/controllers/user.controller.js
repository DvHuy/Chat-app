import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Lấy ra tất cả thông tin user trừ tài khoản của bản thân
    const fileredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); 

    res.status(200).json(fileredUsers)
  } catch (err) {
    console.log("Error in getUserForSideBar controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
