import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to use LitProtocol
app.use(async (req, res, next) => {
  if (!app.locals.litNodeClient) {
    app.locals.litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
      alertWhenUnauthorized: false,
    });
    await app.locals.litNodeClient.connect();
  }
  next();
});

app.post("/encrypt", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  // Encrypt the JSON-LD text and save it to an external service
  // TODO: Implement this

  res
    .status(200)
    .json({ message: "JSON-LD text has been encrypted and saved." });
});

app.post("/decrypt", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  // Retrieve the encrypted JSON-LD text from an external service and decrypt it
  // TODO: Implement this

  res
    .status(200)
    .json({ message: "JSON-LD text has been retrieved and decrypted." });
});

app.post("/prove", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  // Extract some information from the JSON-LD text and generate a zero-knowledge proof
  // TODO: Implement this

  res.status(200).json({ message: "Zero-knowledge proof has been generated." });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
