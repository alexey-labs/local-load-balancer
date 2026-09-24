import express, { Request, Response } from "express";
import http from "http";

const app = express();
app.get("/", (req: Request, res: Response) => {
  // res.send(`Received req: ${JSON.stringify(req.headers, null, 2)}`);
  http
    .get("http://localhost:3001", (backendResponse) => {
      res.statusCode = backendResponse.statusCode ?? 500;
      backendResponse.pipe(res);
    })
    .on("error", (err) => {
      console.error("Error fetching backend response:", err);
      res.status(500).send("Error fetching backend response");
    });
});

app.listen(8080, () => {
  console.log("Load Balancer is running on port 8080");
});
