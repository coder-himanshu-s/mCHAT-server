import amqp from "amqplib";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

export const startSendOtpConsumer = async () => {
  try {
    const connection = amqp.connect({
      protocol: "amqp",
      hostname: process.env.Rabbitmq_Host,
      port: 5672,
      username: process.env.Rabbitmq_Username,
      password: process.env.Rabbitmq_Password,
    });

    const channel = (await connection).createChannel();
    const queueName = "send-otp";
    (await channel).assertQueue(queueName, { durable: true });
    console.log("👍 mail service consumer started listening for otp");
    (await channel).consume(queueName, async (msg) => {
      if (msg) {
        try {
          const { to, subject, body } = JSON.parse(msg.content.toString());
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD,
            },
          });
          await transporter.sendMail({
            from: "CHAT-APP",
            to,
            subject,
            text: body,
          });

          console.log(`OTP mail send  to ${to}`);
          (await channel).ack(msg);
        } catch (error) {
          console.log("Failed to send OTP ", error);
        }
      }
    });
  } catch (error) {
    console.log("Failed to start rabbitmq ", error);
  }
};
