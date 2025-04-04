import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgetPassword from "./components/ForgetPassword";
import Invest from "./components/Invest";
import Account from "./components/Account";
import RechargePage from "./components/RechargePage";
import BankCardForm from "./components/BankCardForm"; // ✅ New import
import List from "./components/List"; // ✅ Import List component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/frgtPwd" element={<ForgetPassword />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/account" element={<Account />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/bank-card" element={<BankCardForm />} />
        <Route path="/list/:type" element={<List />} /> {/* ✅ Dynamic route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
