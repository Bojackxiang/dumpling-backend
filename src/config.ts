export default {
  BACKEND_PORT: process.env.BACKEND_PORT,
  MODE: process.env.MODE,
  MONGO_URI:
    "mongodb+srv://dumpling-account:911004wsrA@cluster0.ee8ps.mongodb.net/dumpling?retryWrites=true&w=majority",
  salt: "awiskdnb",
  sessionConfig: {
    name: "dumpling_id",
    secret: "dumpling_qian_chu",
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 30,
    },
  },
};
