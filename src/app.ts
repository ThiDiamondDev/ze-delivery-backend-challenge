import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes";
import { url } from "./config/db.config";
import "dotenv/config";

export const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
const LOCAL_PORT = process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.json());
app.use(router);

export async function startServer() {
  await connect();
  app.listen(PORT, () => {
    console.log("Server running:");
    console.log(`Docker url: http://localhost:${PORT}`);
    console.log(`Local url: http://localhost:${LOCAL_PORT}`);
  });
}
export async function connect() {
  await mongoose.connect(url);
}
export async function disconnect() {
  await mongoose.disconnect();
}
startServer();
