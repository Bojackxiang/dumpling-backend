export default {
  BACKEND_PORT: process.env.BACKEND_PORT,
  MODE: process.env.MODE,
  MONGO_URI:
    "mongodb+srv://dumpling-account:911004wsrA@cluster0.ee8ps.mongodb.net/dumpling?retryWrites=true&w=majority",
  salt: "asd912980,.9,./.,",
  sessionConfig: {
    name: "dumpling_id",
    secret: "dumpling_qian_chu", //参与加密的字符串（又称签名）
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 30,
    },
  },
};
