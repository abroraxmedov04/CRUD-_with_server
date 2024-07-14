import JWT from "jsonwebtoken";

export default {
  sing: (payload) => JWT.sign(payload, "salom"),
  verify: (payload) => JWT.verify(payload, "salom"),
};
