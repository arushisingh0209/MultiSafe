import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Web3 from 'web3';
import smartContract from '../../truffle_abis/MultiSignature.json';
import SideBar from "../SideBar";
import NavBar from "../NavBar";

const Home = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const [balance, setBalance] = useState(0.0);
    let TransactionRecord = useRef([]);
    let ExecutableTransactions = useRef([]);
    // const [test, setTest] = useState([]);
    // const [TransactionRecord, setTransactionRecord] = useState([]);
    console.log(localStorage.getItem('userWallet'));    //Retrieved from local Storage
    console.log(location.state.wallet);                 //Retrieved from props passed

    const loadBlockchain = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        const web3 = new Web3(window.ethereum);
        const contractData = smartContract.networks["5777"];

        if (contractData) {
            const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
            console.log(multiSig);

            const bal = await web3.eth.getBalance(accounts[0]);
            setBalance(parseFloat(web3.utils.fromWei(bal, ['ether'])).toFixed(2));
        }
    };

    const loadHistory = async () => {
        try {
            //Neeche vala
            const res = await axios.post(
                "http://localhost:5000/FetchTransactionHistory",
                { walletID: localStorage.getItem('userWallet') }
            )
            TransactionRecord.current = res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const loadLockedTransactions = async () => {

        try {
            //Upar vala
            const res = await axios.post(
                "http://localhost:5000/FetchTransactionDetails",
                { walletID: localStorage.getItem('userWallet') }
            )
            ExecutableTransactions.current = res.data;

        } catch (err) {
            console.log(err);
        }
    }

    const UpdateExecution = async (record_id) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/UpdateExecution",
                { member_id: record_id }
            )

        } catch (err) {
            console.log(err);
        }

    }
    // function timeout(delay) {
    //     return new Promise( res => setTimeout(res, delay) );
    // }

    useEffect(() => {
        loadBlockchain();
        loadHistory();
        loadLockedTransactions();
        
    }, []);

    const executeTransaction = async (TransactionID) => {
        const web3 = new Web3(window.ethereum);
        const contractData = smartContract.networks["5777"];

        if (contractData) {
            const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
            //CHANGE 0 TO TransactionID
            try {
                await multiSig.methods.executeTransaction(TransactionID).send({
                    from: localStorage.getItem('userWallet'),
                    address: contractData.address,
                });
            } catch (err) {
                console.log(err.message, "reason");
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
                    <SideBar />
                </div>
                <div className="p-10">
                    <div>
                        Wallet ID: {location.state.wallet}
                    </div>
                    <div className="py-4 mt-10 flex flex-col gap-4">
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Balance</h2>
                                <p>{balance} Ether</p>
                            </div>
                        </div>
                        <div className="card card-compact w-100 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Pending/Locked Transactions</h2>
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left">Sender</th>
                                            <th className="py-2 px-4 border-b text-left">Receiver</th>
                                            <th className="py-2 px-4 border-b text-left">Ether</th>
                                            <th className="py-2 px-4 border-b text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ExecutableTransactions.current.map((Records, index) => (
                                            !Records.isExecuted ?
                                                <tr key={index}>
                                                    <td className="py-2 px-4 border-b text-left">{Records.sender}</td>
                                                    <td className="py-2 px-4 border-b text-left">{Records.receiver}</td>
                                                    <td className="py-2 px-4 border-b text-left">{Records.ether}</td>
                                                    <button
                                                        className="btn btn-success"
                                                        style={{
                                                            backgroundColor: "#72693E",
                                                            color: "#FCFAD1",
                                                            border: "2px solid #72693E", // Set border width and color
                                                            borderRadius: "5px", // Optionally, you can add border radius for rounded corners
                                                            padding: "8px 16px",
                                                        }}
                                                        onClick={() => { executeTransaction(index); UpdateExecution(Records._id) }}
                                                    >
                                                        Execute
                                                    </button>

                                                </tr>
                                                : ''
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div>Transaction History</div>
                    <div className="p-4">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">Sender</th>
                                    <th className="py-2 px-4 border-b text-left">Receiver</th>
                                    <th className="py-2 px-4 border-b text-left">Ether</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TransactionRecord.current.map((Records, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b text-left">{Records.sender}</td>
                                        <td className="py-2 px-4 border-b text-left">{Records.receiver}</td>
                                        <td className="py-2 px-4 border-b text-left">{Records.ether}</td>
                                        {!Records.isExecutable ?
                                            <div>
                                                <td className="py-2 px-4 border-b text-left" style={{ color: 'red' }}>Locked</td>
                                            </div>
                                            : ''}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
