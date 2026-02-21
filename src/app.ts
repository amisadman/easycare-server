import express, { Application, Request, Response } from "express";
import cors from "cors";
import os from "os";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import { envVars } from "./app/config";
import qs from "qs"

const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", toNodeHandler(auth));

app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  const date = new Date().toISOString();
  const serverHostname = os.hostname();
  const serverUptime = os.uptime();
  const serverPlatform = os.platform();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  return res.status(200).json({
    success: true,
    message: "Welcome to EasyCare",
    version: "1.0.0",
    clientDetails: {
      clientIP: clientIp,
      accessedAt: date,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60,
      )} minutes`,
    },
  });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
