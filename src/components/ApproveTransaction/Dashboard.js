import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import axios from "axios";

const Dashboard = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:5000/FetchTransactionDetails");
        setTransactionDetails(res.data); // Assuming res.data is an array of transaction details
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); // Run the effect only once on mount

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
              Click
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {transactionDetails.map((transaction, index) => (
                <li key={index}>
                  <a>{`Sender: ${transaction.sender}, Receiver: ${transaction.receiver}, Ether: ${transaction.ether}`}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="btn btn-outline btn-primary">Execute</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
