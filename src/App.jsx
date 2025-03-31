import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgetPassword from "./components/ForgetPassword";
import Invest from "./components/Invest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invest" element={<Invest />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/frgtPwd" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
