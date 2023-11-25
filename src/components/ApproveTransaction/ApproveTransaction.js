import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import smartContract from '../../truffle_abis/MultiSignature.json';

const ApproveTransaction = () => {
  const check = async () => {
    const web3 = new Web3(window.ethereum);
    const contractData = smartContract.networks["5777"];

    if (contractData) {
      const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
      const submit = await multiSig.methods.confirmTransaction(0).send({
        from: localStorage.getItem('userWallet'),
        address: contractData.address,
        // value: Number(amount * 1e18).toString(16)
      });
      console.log(submit.blockHash, "submit")
    }

  };

  useEffect(() => {
    // check();
  })

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
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div> <button className="btn btn-outline btn-primary" onClick={check}>Execute</button></div>

        </div>
      </div>
    </div>
  );
};

export default ApproveTransaction;
