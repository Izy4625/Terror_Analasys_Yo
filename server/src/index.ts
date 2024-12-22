import express from 'express'
import cors from "cors"
import { Request,Response } from 'express';
import connectDB from './config/db';
import analysisRoute from './routes/analysis.route';
import attackRouter from './routes/attacks.route';
const app = express();
connectDB()

app.use(
    cors({
      origin:["http://localhost:5173" ,"*"],
      credentials: true,
    })
  );
app.use(express.json());
app.use('/api/analysis',analysisRoute)
app.use('/api/attacks', attackRouter)
app.use(async (req: Request, res: Response) => {
  console.error("ERR")
  
  res.send("err")
});


app.listen(3001, () => {
    console.log("server is up on 3001")
});