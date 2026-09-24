import express, { Request, Response } from "express";
import http from "http";

const app = express();

const servers = ["http://localhost:3001", "http://localhost:3002"];
let currentServerIndex = 0;

app.get("/", (req: Request, res: Response) => {
  // res.send(`Received req: ${JSON.stringify(req.headers, null, 2)}`);
  const nextServerUrl = servers[currentServerIndex] as string;

  http
    .get(nextServerUrl, (backendResponse) => {
      res.statusCode = backendResponse.statusCode ?? 500;
      backendResponse.pipe(res);
    })
    .on("error", (err) => {
      console.error("Error fetching backend response:", err);
      res.status(500).send("Error fetching backend response");
    });

  currentServerIndex < servers.length - 1
    ? currentServerIndex++
    : (currentServerIndex = 0);
});

app.listen(8080, () => {
  console.log("Load Balancer is running on port 8080");
});
