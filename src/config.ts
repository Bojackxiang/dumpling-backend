export default {
    BACKEND_PORT: process.env.BACKEND_PORT,
    MODE: process.env.MODE,
    MONGO_URI: process.env.MONGO_URI,
    salt: 'awiskdnb',
    sessionConfig: {
        name: 'dumpling_id',
        secret: 'dumpling_qian_chu',
        saveUninitialized: true,
        resave: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 30,
        },
    },
};
