import React, { useState, useEffect } from "react";
import smartContract from '../../truffle_abis/MultiSignature.json';
import axios from "axios";
import Web3 from 'web3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers';
import NavBar from "../NavBar";
import Sidebar from "../SideBar";

const MakePayment = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState();
  const [executeAt, setExecuteAt] = useState('');

  const handleReceiver = (event) => {
    setReceiver(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  }


  const handleExecute = async (event) => {
    event.preventDefault();
    const web3 = new Web3(window.ethereum);
    const contractData = smartContract.networks["5777"];

    if (contractData) {
      const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
      const submit = await multiSig.methods.submitTransaction(receiver).send({
        from: localStorage.getItem('userWallet'),
        address: contractData.address,
        value: Number(amount * 1e18).toString(16)
      });
      console.log(submit.blockHash, "submit")

      /* CALL API HERE
      Create database 'TransactionRecord'
      store 1. Sender = localStorage.getItem('userWallet'), 
            2. Receiver = receiver
            3. Ether = amount
      */
      console.log(amount)

      try {
        const res = await axios.post("http://localhost:5000/PostTransactionRecord", { 
          sender: await localStorage.getItem('userWallet'), 
          receiver: receiver, 
          ether: amount,
          executeAt: executeAt 
        });
        console.log(amount);
      } catch (err) {
        console.log(err);
      }

    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col justify-center items-center space-x-6" style={{ width: "100%"}}>
          <div className="flex flex-col justify-center my-2" style={{ width: "38rem"}}>
            <div className="hero  bg-base-200 space-y-8">
              <div className="hero-content flex lg:flex-row-reverse" style={{ width: "100%"}}>
                <div className="card flex w-full max-w-xl shadow-2xl bg-base-100">
                  <form className="card-body ">
                    <div className="flex flex-row w-full gap-5">
                      <div className="flex flex-col" style={{ width: "100%"}}>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Transfer to</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Wallet Address"
                            className="input input-bordered"
                            value={receiver}
                            onChange={handleReceiver}
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Transfer Amount (ETH)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ethereum"
                            className="input input-bordered"
                            value={amount}
                            onChange={handleAmount}
                            required
                          />
                        </div>

                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Lock Transaction Until
                              </span>
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                // defaultValue={dayjs('2022-04-17T15:30')} 
                                label='Date & Time'
                                value={executeAt}
                                onChange={setExecuteAt}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <div style={{ width: "17rem"}}>
              <button
          className="ml-40 mt-10 btn btn-primary"
          style={{ color: "#FCFAD1", backgroundColor: "#72693E", width: "100%" }}
          onClick={handleExecute}
        >
          TRANSFER
        </button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
