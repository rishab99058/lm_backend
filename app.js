import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./database/database.js";
import {errorMiddleware} from "./middleware/errormiddleware.js";

export const app = express();

config({path:"./config/config.env"});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended:true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],  
})); // for cors

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB();
app.use(errorMiddleware);
export default app;