import React, { useRef, useState, useEffect } from "react";
import Web3 from "web3";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import axios from "axios";
import smartContract from "../../truffle_abis/MultiSignature.json";

const ApproveTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // let selected = useRef(null);
  const [selected, setSelected] = useState(-1);
  console.log(selected);

  const approve = async () => {
    const web3 = new Web3(window.ethereum);
    const contractData = smartContract.networks["5777"];

    if (contractData) {
      const multiSig = await new web3.eth.Contract(
        smartContract.abi,
        contractData.address
      );
      const submit = await multiSig.methods.confirmTransaction(selected).send({
        from: localStorage.getItem("userWallet"),
        address: contractData.address,
      });
      console.log(submit.blockHash, "submit");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/FetchTransactionDetails"
      );
      setTransactionDetails(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
        <div className="flex flex-col px-80 mt-8">
          <div className="p-2 w-2/3 h-20 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 flex flex-row justify-between">
            <select
              id="options"
              onChange={handleOptionChange}
              value={selectedOption}
              placeholder="Yes/NO"
              className="select select-bordered w-full focus:ring focus:ring-primary focus:border-primary"
            >
              <option value="" disabled hidden>
                Select Transaction
              </option>
              {transactionDetails.map((transaction, index) => (
                <option key={index} value={index}>
                  {`Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Ether: ${transaction.ether}`}
                </option>
              ))}
            </select>
          </div>
          <div className="px-40">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full" style={{color:"#FCFAD1"}}></span>
            </span>
            <button
              className="btn btn-outline btn-primary w-52"
              onClick={approve}
              style={{ color: "#FCFAD1", backgroundColor: "#72693E" }}
            >
              Approve
            </button>
          </div>
        </div>

        {/* <div className="flex flex-col space-y-6 space-x-12">
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
        </div> */}
      </div>
    </div>
  );
};

export default ApproveTransaction;
