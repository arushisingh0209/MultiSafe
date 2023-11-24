import React from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const Dashboard = () => {
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
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div> <button className="btn btn-outline btn-primary">Execute</button></div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
