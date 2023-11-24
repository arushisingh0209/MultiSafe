import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";


const SideBar = (Props) => {
  const navigate = useNavigate();
  const walletID = useRef(null);

  useEffect(() => {
    walletID.current = localStorage.getItem('userWallet');
  });

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side lg:max-w-lg">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className="menu p-4 w-60 min-h-full bg-base-200 text-base-content"
            style={{ backgroundColor: "#FCFAD1" }}
          >
            {/* Sidebar content here */}
            <li>
              <a style={{ color: "#72693E" }}
                onClick={() => navigate('/home', { state: { wallet: walletID.current } })}>DashBoard</a>
            </li>
            <li>
              <div className="dropdown">
                <label tabIndex={0} className="list" style={{ color: "#72693E" }}
                  onClick={() => { navigate('/makepayment') }}>
                  Make Payment
                </label>
              </div>
            </li>
            <li>
              <a style={{ color: "#72693E" }} onClick={() => { navigate('/approvetransactions') }}>Approve Transaction</a>
            </li>
            <li>
              <a style={{ color: "#72693E" }}>Execute Transaction</a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
