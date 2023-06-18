import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import lit from "./lit";
import ipfsRoutes from "./routes/ipfs";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to use LitProtocol
app.use(async (req, res, next) => {
  if (!lit.litNodeClient) {
    await lit.connect();
  }
  next();
});

app.post("/prove", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  // Extract some information from the JSON-LD text and generate a zero-knowledge proof
  // TODO: Implement this

  res.status(200).json({ message: "Zero-knowledge proof has been generated." });
});

// Use the imported routes
app.use("/ipfs", ipfsRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
