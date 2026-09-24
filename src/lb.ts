import express, { Request, Response } from "express";
import http from "http";

const healthInteval = Number(process.env.HEALTH_INTERVAL) || 5000;

const app = express();

const servers = [
  { url: "http://localhost:3001", alive: true },
  { url: "http://localhost:3002", alive: true },
  { url: "http://localhost:3003", alive: true },
];

let currentServerIdx = 0;

app.get("/", (req: Request, res: Response) => {
  const healthyServers = servers.filter((s) => s.alive);
  if (healthyServers.length === 0) {
    res.status(503).send("Service is unavailable");
    return;
  }

  // Get next server in round-robin order
  currentServerIdx = currentServerIdx % healthyServers.length;
  const nextServerUrl = healthyServers[currentServerIdx]!.url;
  currentServerIdx++;

  http
    .get(nextServerUrl, (backendResponse) => {
      res.statusCode = backendResponse.statusCode ?? 500;
      backendResponse.pipe(res);
      console.log(`Responded from server ${nextServerUrl}`);
    })
    .on("error", (err) => {
      console.error("Error fetching backend response:", err);
      res.status(500).send("Error fetching backend response");
    });
});

setInterval(checkServersHealth, healthInteval);

app.listen(8080, () => {
  console.log("Load Balancer is running on port 8080");
});

function checkServersHealth() {
  for (const server of servers) {
    http
      .get(`${server.url}/health`, (backendResponse) => {
        const status = backendResponse.statusCode ?? 500;
        if (status !== 200) throw new Error("Service unavailable");
        console.log(`Server is healthy ${server.url}`);
        server.alive = true;
      })
      .on("error", (err) => {
        console.error(`Server is unhealthy ${server.url}`);
        server.alive = false;
      });
  }
}
