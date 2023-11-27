import React, { useRef, useState, useEffect } from "react";
import Web3 from 'web3';
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import axios from "axios";
import smartContract from '../../truffle_abis/MultiSignature.json';

const ApproveTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [selected, setSelected] = useState(-1);
  console.log(selected)

  const approve = async () => {
    const web3 = new Web3(window.ethereum);
    const contractData = smartContract.networks["5777"];

    if (contractData) {
      const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
      //CHANGE 0 TO SELECTED
      const submit = await multiSig.methods.confirmTransaction(1).send({
        from: localStorage.getItem('userWallet'),
        address: contractData.address,
      });
      console.log(submit.blockHash, "submit")
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:5000/FetchTransactionDetails");
        setTransactionDetails(res.data); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col space-y-6 space-x-12">
          <div className="dropdown space-x-12">
            <label tabIndex={0} className="btn m-1">
              Select Transaction
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {transactionDetails.map((transaction, index) => (
                <li key={index}>
                  <a onClick={() => setSelected(index)}>{`Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Ether: ${transaction.ether}`}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="btn btn-outline btn-primary" onClick={approve}>Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveTransaction;
