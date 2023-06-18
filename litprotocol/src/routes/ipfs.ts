import express, { Request, Response } from "express";
const router = express.Router();

router.post("/encrypt", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  res
    .status(200)
    .json({ message: "JSON-LD text has been encrypted and saved." });
});

router.post("/decrypt", async (req: Request, res: Response) => {
  const jsonldText = req.body;

  // Retrieve the encrypted JSON-LD text from an external service and decrypt it
  // TODO: Implement this

  res
    .status(200)
    .json({ message: "JSON-LD text has been retrieved and decrypted." });
});

export default router;
