import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountManagement from "./pages/AccountManagement/AccountManagement";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import "./App.scss";
import Home from "./pages/Home/Home";
import IntroduceMovie from "./pages/IntroduceMovie/IntroduceMovie";
import Cart from "./pages/Cart/Cart";
import History from "./pages/History/History";
import MovieManagement from "./pages/MovieManagement/MovieManagement";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import PaymentOrders from "./pages/PaymentOrders/PaymentOrders";
import PaymentManagements from "./pages/PaymentManagements/PaymentManagements";
import Statistical from "./pages/Statistical/Statistical";

function App() {
  const admin = localStorage.getItem("admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/page-login-ticket-movie" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/:user/cart" element={<Cart />} />
          <Route path="/:user/history" element={<History />} />
          <Route path="/payment-orders/:id" element={<PaymentOrders />} />
          <Route
            path="/home-page-ticket-movie/:movieID/:time"
            element={<IntroduceMovie />}
          />
          <Route path="/register" element={<Register />} />
          {admin === "true" && (
            <Route path="/account-management" element={<AccountManagement />} />
          )}
          {admin === "true" && (
            <Route path="/movie-management" element={<MovieManagement />} />
          )}
          {admin === "true" && (
            <Route path="/order-management" element={<OrderManagement />} />
          )}
          {admin === "true" && (
            <Route path="/statistical" exact element={<Statistical />} />
          )}
          {admin === "true" && (
            <Route
              path="/payment-managements"
              element={<PaymentManagements />}
            />
          )}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
