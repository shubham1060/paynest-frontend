import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgetPassword from "./components/ForgetPassword";
import Invest from "./components/Invest";
import Account from "./components/Account";
import RechargePage from "./components/RechargePage";
import BankCardForm from "./components/BankCardForm"; 
import Footer from "./components/Footer";
import PrizeTask from "./components/PrizeTask";
import LoaderPage from "./components/LoaderPage"; 
import BillingList from "./components/BillingList";
import WithdrawalRecords from "./components/WithdrawalRecords";  
import PageNotFound from "./components/PageNotFound";
import RechargeRecords from "./components/RechargeRecords";
import CommisionRecords from "./components/CommisionRecords";
import UserSettings from "./components/UserSettings"; 
import ResetPaymentPasswordPage from './components/ResetPaymentPasswordPage';
import Withdraw from "./components/Withdraw"; 
import Orders from "./components/Orders";
import MyFeedbackPage from "./components/MyFeedbackPage";
import SelfService from "./components/SelfService";
import SupportPage from "./components/SupportPage";
import AboutUsPage from "./components/AboutUsPage";
import AmountEarned from "./components/AmountEarned";
import { AlertProvider } from "./components/AlertContext";
import Rules from "./components/Rules";

function App() {
  const [value, setValue] = useState("invest");
  return (
    <AlertProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forget-Password" element={<ForgetPassword />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/prize-task" element={<PrizeTask />} />
        <Route path="/account" element={<Account />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/bank-card" element={<BankCardForm />} />
        <Route path="/billing" element={<BillingList />} />
        <Route path="/loader" element={<LoaderPage />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/withdraw-record" element={<WithdrawalRecords />} /> 
        <Route path="/recharge-record" element={<RechargeRecords />} />
        <Route path="/commission-record" element={<CommisionRecords />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/reset-payment-password" element={<ResetPaymentPasswordPage />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/my-order" element={<Orders />} />
        <Route path="/my-feedback" element={<MyFeedbackPage />} />
        <Route path="/self-service" element={<SelfService />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/amount-earned" element={<AmountEarned />} />

      </Routes>
      <Footer value={value} onChange={setValue} />
    </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
