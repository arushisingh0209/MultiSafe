import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import TransactionScehema from "./TransactionRecord.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));


  // Posting Transaction Record

  app.post("/PostTransactionRecord", async (req, res) => {
    const {sender,receiver,ether} = req.body;
    console.log(sender,receiver,ether);
            const transactionRecords = new TransactionScehema({
              sender:sender,
              receiver:receiver,
              ether:ether
            });
  
            transactionRecords.save();
            console.log(transactionRecords);
            res.send("ok");
          })

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });