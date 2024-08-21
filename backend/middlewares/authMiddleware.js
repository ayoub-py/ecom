const jwt = require('jsonwebtoken');

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;   

  }
}

const authMiddleware = async (req, res, next) => {
  //do the auth logic
  const token = req.headers.authorization.split(' ')[1];
  let decoded = verifyToken(token);
  if (decoded) {
    next()
    // return res.json(decoded);
  }
  return res.json({ message: "unauthorized route ! " });
};

module.exports = authMiddleware;