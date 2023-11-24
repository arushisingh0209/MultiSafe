import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import smartContract from '../../truffle_abis/MultiSignature.json';
import Web3 from 'web3';

const Home = () => {
    const navigate = useNavigate();
    let location = useLocation();
    console.log(localStorage.getItem('userWallet'));    //Retrieved from local Storage
    console.log(location.state.wallet);                 //Retrieved from props passed

    const test = async () => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
        console.log('-----')
        const web3 = new Web3(window.ethereum);
        // web3 = window.web3;
        // const networkId = await new web3.eth.net.getId();
        // console.log(networkId, "Network ID");
        const contractData = smartContract.networks["5777"];
        if(contractData) {
            const multiSig = await new web3.eth.Contract(smartContract.abi, contractData.address);
            console.log(multiSig);
            console.log(Web3.version, "version")
            const submit = await multiSig.methods.submitTransaction('0x2e7117531C9b925b380AfD93206d0754eB81e471').send({
                from: accounts[0],
                address: contractData.address,
                value: 2000000000000000000
            });
            console.log(submit)
            
        }

    };


    useEffect(() => {
        test();
    });

    return (
        <div>
            <h1>Home Page</h1>
            Wallet ID: {location.state.wallet}
        </div>
    );

};

export default Home;