import React, { useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    let location = useLocation();
    console.log(localStorage.getItem('userWallet'));    //Retrieved from local Storage
    console.log(location.state.wallet);                 //Retrieved from props passed
    return (
        <div>
            <h1>Home Page</h1>
            Wallet ID: {location.state.wallet}
        </div>
    );
};

export default Home;