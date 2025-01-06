import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import compression from "compression";
import router from './src/routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/userRoutes.js';
import notFound from './src/middlewares/notFound.js';
dotenv.config();

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compression({ level: 1 }));
app.use(cors(corsOptions));

app.use('/v1/api', router);
// app.use('/v1/api', userRouter); // incomplete

app.use(notFound);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`listening on ${process.env.SERVER_PORT}`)
})
