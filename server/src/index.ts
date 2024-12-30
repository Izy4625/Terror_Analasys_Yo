import express from 'express'
import cors from "cors"
import { Request,Response } from 'express';
import connectDB from './config/db';
import analysisRoute from './routes/analysis.route';
import attackRouter from './routes/attacks.route';
import { Server } from 'socket.io';
import { createServer } from 'http';
const app = express();
connectDB()
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: "*", methods: "*", credentials: true } });
io.on('connection',() => {
  console.log('new user connected')
})
app.use(cors())
 
app.use(express.json());
app.use('/api/analysis',analysisRoute)
app.use('/api/attacks', attackRouter)
app.use(async (req: Request, res: Response) => {
  console.error("ERR")
  res.send("err")
});


httpServer.listen(3001, () => {
    console.log("server is up on 3001")
});