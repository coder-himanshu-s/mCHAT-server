import express from "express";
import { configDotenv } from "dotenv";
import { startSendOtpConsumer } from "./consumer.js";
configDotenv();

startSendOtpConsumer();
const app= express();

const PORT = process.env.PORT || 5001;

app.listen(process.env.PORT,()=>{
   
    console.log(`Server is listening on ${PORT}`);
})