import 'dotenv/config';
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import adminApi from "./routes/admins/index.route";
import { connectDatabase } from "./configs/database.config";
const app = express()
const port = process.env.PORT
connectDatabase();

app.use(cors({
  origin: [
    String(process.env.FE_HOST)
  ],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser());
app.use("/api/admin", adminApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
