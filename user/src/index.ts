import { configDotenv } from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
configDotenv();
import { createClient } from "redis";
import userRoutes from './routes/user.js';
import { connectRabbitMQ } from "./config/rabbitmq.js";


const app = express();
connectDB();
app.use(express.json());

connectRabbitMQ();




export const redisClient = createClient({
  url : process.env.REDIS_URL as string,
});

redisClient
  .connect()
  .then(() => console.log("connected to redis "))
  .catch((error) => {
    console.log(error);
  });


app.use("/api/v1",userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
