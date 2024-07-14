import jwt from "../lib/jwt.js";

// Token
export default (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res?.status(500).send({
        status: 500,
        message: "Required token",
      });
    }

    jwt.verify(token);

    return next();
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
