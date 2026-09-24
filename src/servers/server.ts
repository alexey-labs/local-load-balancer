import express, { Request, Response } from "express";

const serverNumber = process.env.SERVER_NUMBER;
const PORT = Number(`300${serverNumber}`);

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(
    `Received req: ${JSON.stringify(req.headers, null, 2)}, responding from server ${serverNumber}`,
  );
});

app.listen(PORT, () => {
  console.log(
    `Replied with Hello Message from server ${serverNumber}, PORT: ${PORT}`,
  );
});
