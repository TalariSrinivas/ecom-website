// utils/createToken.js
import jwt from 'jsonwebtoken';

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",  // true on deployed HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // none for cross-site prod, lax locally
  maxAge: 30 * 24 * 60 * 60 * 1000,
});
};

export default createToken;
