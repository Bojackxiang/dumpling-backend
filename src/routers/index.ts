import * as express from 'express'
import authRouter from './auth'

const router = express.Router();

router.use("/api/auth", authRouter);

export default router; 

