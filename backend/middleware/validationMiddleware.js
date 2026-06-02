export const validateRegister = (req, res, next) => {
  const { name, email, password, address } = req.body;

  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({
      message: "Name must be between 20 and 60 characters"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email"
    });
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be 8-16 chars and contain uppercase + special character"
    });
  }

  if (address && address.length > 400) {
    return res.status(400).json({
      message: "Address cannot exceed 400 characters"
    });
  }

  next();
};