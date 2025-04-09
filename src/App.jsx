import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgetPassword from "./components/ForgetPassword";
import Invest from "./components/Invest";
import Account from "./components/Account";
import RechargePage from "./components/RechargePage";
import BankCardForm from "./components/BankCardForm"; // ✅ New import
import List from "./components/List"; // ✅ Import List component 
import Footer from "./components/Footer";
import PrizeTask from "./components/PrizeTask";
import NewAccount from "./components/NewAccountPage";
import LoaderPage from "./components/LoaderPage";
import WithdrawalRecords from "./components/WithdrawalRecords";  
import RechargeRecords from "./components/RechargeRecords";
import CommisionRecords from "./components/CommisionRecords";
import UserSettings from "./components/UserSettings"; // 👈 New page
import ResetPaymentPasswordPage from './components/ResetPaymentPasswordPage';



function App() {
  const [value, setValue] = useState("invest");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forget-Password" element={<ForgetPassword />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/prize-task" element={<PrizeTask />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/new-account" element={<NewAccount />} /> */}
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/bank-card" element={<BankCardForm />} />
        <Route path="/list/:type" element={<List />} /> {/* ✅ Dynamic route */}
        <Route path="/loader" element={<LoaderPage />} />
        <Route path="/withdraw-record" element={<WithdrawalRecords />} /> 
        <Route path="/recharge-record" element={<RechargeRecords />} />
        <Route path="/commission-record" element={<CommisionRecords />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/reset-payment-password" element={<ResetPaymentPasswordPage />} />

      </Routes>
      <Footer value={value} onChange={setValue} />
    </BrowserRouter>
  );
}

export default App;
