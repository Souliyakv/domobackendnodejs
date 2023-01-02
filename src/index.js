import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router/route.js";
dotenv.config();

const Port = process.env.PORT;

const app = express();
app.use(bodyParser.json({extended:false,limit:"5000mb"}));
app.use(bodyParser.urlencoded({extended:false,limit:"5000mb",parameterLimit:50000}));
app.use(cors());

const api = '/api';
app.use(api,router);

app.listen(3000,()=>{
    console.log(`Server running on port ${Port}`);
})


