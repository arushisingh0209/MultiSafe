import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home/Home';
import MakePayment from './components/MakePayment/MakePayment';
import ApproveTransactions from './components/ApproveTransaction/ApproveTransaction';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/makepayment" element={<MakePayment />} />
      <Route path="/approvetransactions" element={<ApproveTransactions />} />
      
    </Routes>
  </BrowserRouter>
);

