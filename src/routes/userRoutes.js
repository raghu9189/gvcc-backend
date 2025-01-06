import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { users } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/users'); // incomplete
userRouter.get('/reports'); // incomplete
userRouter.post('/verify', verifyToken(), users); // testing

export default userRouter;