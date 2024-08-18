const Admin = require('./../models/Hotel/Admin');
const User = require('./../models/User');

const checkRole = (roles, adminOnly = false) => {
    return async (req, res, next) => {
        try {
            if (req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const userId = req.user.id;

            // Check if the user is an admin
            let user = await Admin.findById(userId);
            
            if (!user && !adminOnly) {
                // If the user is not an admin and adminOnly flag is false, check user roles
                user = await User.findById(userId);
            }

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            if (adminOnly && !user.isAdmin) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};


module.exports = checkRole;

module.exports = checkRole;