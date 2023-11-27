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
    isExecutable: false
  });

  transactionRecords.save();
  console.log(transactionRecords);
  res.send("ok");
});

app.post("/FetchTransactionDetails", async (req, res) => {
  const transactionDetails = await TransactionSchema.find();
    console.log(transactionDetails);
    res.send(transactionDetails);
});

app.post("/FetchTransactionHistory", async (req, res) => {
  const{walletID} = req.body;
  const transactionDetails = await TransactionSchema.find({receiver:walletID.toLowerCase()});
    console.log(transactionDetails);
    res.send(transactionDetails);
});


//Execute Transaction
setInterval(() => {
  TransactionSchema.find({}).then((transactionList) => {
    if (transactionList) {
      transactionList.forEach(async transaction => {
        const now = new Date()
        var transactionTime = new Date(transaction.executeAt);
        if (!transaction.isExecutable && (transactionTime - now) < 0) {
          console.log(transaction);
          // if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
          //   console.log('HERE')
          //   const web3 = new Web3(window.ethereum);
          //   const contractData = smartContract.networks["5777"];

          //   if (contractData) {
          //     const multiSig = await new web3.eth.Contract(
          //       smartContract.abi,
          //       contractData.address
          //     );
          //     const submit = await multiSig.methods.executeTransaction(0).send({
          //       from: localStorage.getItem("userWallet"),
          //       address: contractData.address,
          //     });
          //   }
            await TransactionSchema.findByIdAndUpdate(transaction._id, { isExecutable: true });
          // }
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
