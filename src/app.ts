import express, { Application, Request, Response } from "express";
import cors from "cors";
import os from 'os'

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  const date = new Date().toISOString();
  const serverHostname = os.hostname();
  const serverUptime = os.uptime();
  const serverPlatform = os.platform();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  return res.status(200).json({
    success: true,
    message: "Welcome to Food Express",
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

export default app;
