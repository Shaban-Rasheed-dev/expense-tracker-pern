import { findUserById } from "../../models/dashboard/dashboardModel.js";

// Return the logged-in user's dashboard data
export const getDashboardData = async (req, res) => {
  try {
    // req.user is set by authTokenMiddleware from the verified token
    const user = await findUserById(req.user.id);
    // Token is valid but the user no longer exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
