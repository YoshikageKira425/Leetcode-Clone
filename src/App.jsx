import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Problem from "./Pages/Code Editor/problem";
import ProblemEditor from "./Pages/Code Editor/problemEditor";
import LogIn from "./Pages/Log In/logIn";
import SignUp from "./Pages/Sign Up/signUp";
import NotFound from "./Pages/notFound";
import Account from "./Pages/Account/account";
import AccountSettings from "./Pages/Account/accountSettings";
import './Style/output.css';
import Admin from "./Pages/Admin Pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/settings" element={<AccountSettings />} />
      <Route path="/problem/:id" element={<Problem />} />
      <Route path="/problem/:id/editor" element={<ProblemEditor />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App
