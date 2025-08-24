import express from "express";
import {config} from "dotenv";

export const app = express();

config({path:"./config/config.env"});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended:true})); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;