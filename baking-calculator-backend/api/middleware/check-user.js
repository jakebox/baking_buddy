const checkUser = (req, res, next) => {
  const authenticatedUserId = req.userData.userId;
  const requestedUserId = req.params.userID;

  // Check if the authenticated user matches the requested user
  if (authenticatedUserId !== requestedUserId) {
    return res.status(403).json({ message: "Forbidden - You don't have permission to perform this action" });
  }

  next();
};

module.exports = checkUser;
