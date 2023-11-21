import React from 'react';
import logo from "./logo.png";

const LandingPage = () => {
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
        <button className="btn btn-wide" style={{backgroundColor:"#72693E",color:"#FCFAD1"}}>Connect To Wallet</button>
      </div>
    </div>
  );
};

export default LandingPage;
