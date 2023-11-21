import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  let walletID = useRef(null);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts[0]);
        walletID.current = accounts[0];                   //To ensure no login without wallet
        localStorage.setItem('userWallet', accounts[0]);  //To access walletID throughout website
                                                          //by {localStorage.getItem('userWallet')};
      } catch (err) {
        console.error(err.message);
      }

    } else {
      console.log("Please install MetaMask");
    }
  }

  const handleSubmit = async () => {
    await connectWallet();
    navigate('/home', { state: { wallet: walletID.current } });
  }

  return (
    <div className="flex flex-row" style={{ backgroundColor: "#FCFAD1" }}>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/images/multisafeBG.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "60%",
        }}
      ></div>
      <div className="flex flex-column flex-wrap align-end items-center justify-center pb-28" style={{ width: "40%" }}>
        <img src={logo} className='w-full' alt="Logo" />
        <button 
        className="btn btn-wide" 
        style={{ backgroundColor: "#72693E", color: "#FCFAD1" }} 
        onClick={() => handleSubmit()}>
            Connect To Wallet
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
