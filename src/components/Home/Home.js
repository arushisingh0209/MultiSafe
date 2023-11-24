import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import smartContract from '../../truffle_abis/MultiSignature.json';
import Web3 from 'web3';
import SideBar from "../SideBar";
import NavBar from "../NavBar";

const Home = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const [balance, setBalance] = useState(0.0);
    console.log(localStorage.getItem('userWallet'));    //Retrieved from local Storage
    console.log(location.state.wallet);                 //Retrieved from props passed

    const loadBlockchain = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
        console.log('-----')
        const web3 = new Web3(window.ethereum);
        // web3 = window.web3;
        // const networkId = await new web3.eth.net.getId();
        // console.log(networkId, "Network ID");
        const contractData = smartContract.networks["5777"];
        if (contractData) {
            const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
            console.log(multiSig);

            const bal = await web3.eth.getBalance(accounts[0]);
            setBalance(parseFloat(web3.utils.fromWei(bal, ['ether'])).toFixed(2));

            // const submit = await multiSig.methods.submitTransaction('0x2e7117531C9b925b380AfD93206d0754eB81e471').send({
            //     from: accounts[0],
            //     address: contractData.address,
            //     value: 2000000000000000000
            // });
            // console.log(submit)

        }

    };


    useEffect(() => {
        loadBlockchain();
    });

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
                    <div className="py-4 mt-10 flex flex-row gap-4">
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Balance</h2>
                                <p>{balance} Ether</p>
                            </div>
                        </div>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Pending/Locked Transactions</h2>
                                <p>20 Ether</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
