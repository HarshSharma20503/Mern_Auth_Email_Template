import jwt from "jsonwebtoken";

/**
 * generateJWTToken
 * @desc   Generate a JWT token for a given user ID
 * @param  {string} _id - User ID
 * @return {string} - JWT token
 */
export const generateJWTToken = (_id) => {
  // Sign the token with the user ID and secret, setting expiration to 30 days
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
