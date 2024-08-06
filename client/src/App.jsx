import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import SignupPage from "./components/Signup/Signup";
import "./App.css";
import HomePage from "./components/Home/Home";
import AboutPage from "./components/About/About";
import ContactPage from "./components/Contact/Contact";
import Form from "./components/Restaurant/Form";
import HomePageNgo from "./components/Home/HomeNgo";
import Order from "./components/Ngo/Order";
import ContactNgoPage from "./components/Contact/ContactNgo";
import AboutNgoPage from "./components/About/AboutNgo";
import Checkout from "./components/Ngo/Checkout";
import HistoryPage from "./components/Restaurant/History";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restauranthome" element={<HomePage />} />
        <Route path="/ngohome" element={<HomePageNgo />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/addFood" element={<Form />} />
        <Route path="/order" element={<Order />} />
        <Route path="/ngoabout" element={<AboutNgoPage />} />
        <Route path="/ngocontact" element={<ContactNgoPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
