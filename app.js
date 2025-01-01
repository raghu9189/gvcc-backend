import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_HOST);

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({message: 'OK'});
});

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`listening on ${process.env.SERVER_PORT}`)
})