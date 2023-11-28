import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import TransactionSchema from "./TransactionRecord.js";

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
  const { sender, receiver, ether, executeAt } = req.body;
  console.log(sender, receiver, ether, executeAt);
  const transactionRecords = new TransactionSchema({
    sender: sender.toLowerCase(),
    receiver: receiver.toLowerCase(),
    ether: ether,
    executeAt: executeAt,
    isExecutable: false,
    isExceuted: false
  });

  transactionRecords.save();
  console.log(transactionRecords);
  res.send("ok");
});

app.post("/FetchTransactionDetails", async (req, res) => {
  const { walletID } = req.body;
  const transactionDetails = await TransactionSchema.find({
    receiver: walletID,
    isExecutable: true
  });
  console.log(transactionDetails);
  res.send(transactionDetails);
});

app.post("/FetchAll", async (req, res) => {
  const transactionDetails = await TransactionSchema.find({
  });
  console.log(transactionDetails);
  res.send(transactionDetails);
});


app.post("/FetchTransactionHistory", async (req, res) => {
  const { walletID } = req.body;
  const conditions = {
    $or: [
      { sender: walletID.toLowerCase() },
      { receiver: walletID.toLowerCase() }
    ]
  };
  const transactionDetails = await TransactionSchema.find(conditions);
  console.log(transactionDetails);
  res.send(transactionDetails);
});

app.post("/UpdateExecution", async (req, res) => {
  const { member_id } = req.body;
  const updatedTransaction = await TransactionSchema.findByIdAndUpdate(
    member_id,
    { isExecuted: true }
  );
  if (!updatedTransaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }
  res.send(updatedTransaction);
})


//Execute Transaction
setInterval(() => {
  TransactionSchema.find({}).then((transactionList) => {
    if (transactionList) {
      transactionList.forEach(async transaction => {
        const now = new Date()
        var transactionTime = new Date(transaction.executeAt);
        if (!transaction.isExecutable && (transactionTime - now) < 0) {
          console.log(transaction);
          await TransactionSchema.findByIdAndUpdate(transaction._id, { isExecutable: true });
        }
      })
    }
  }).catch((err) => {
    console.log(err);
  });
}, 1000);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
