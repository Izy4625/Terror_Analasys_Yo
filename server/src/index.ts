import express from 'express'
import cors from "cors"

import connectDB from './config/db';
const app = express();
connectDB()

app.use(
    cors({
      origin:["http://localhost:5173" ,"*"],
      credentials: true,
    })
  );
app.use(express.json());


app.listen(3001, () => {
    console.log("server is up on 3001")
});