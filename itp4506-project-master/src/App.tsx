import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { BrowseMenus } from './components/customer/BrowseMenus';
import { LoginPage } from './components/common/LoginPage';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DeliveryInstructions } from './components/delivery/DeliveryInstructions';
import { ManageMenus } from './components/restaurant/ManageMenus';
import { OnlineTracking } from "./components/customer/OnlineTracking";
import { Profile } from "./components/common/profile";
import { RestaurantMenu } from "./components/common/RestaurantMenu";
import { ConfirmAddress } from "./components/customer/ConfirmAddress";
import { ConfirmPayment } from "./components/customer/ConfirmPayment";
import { PaymentSuccessful } from "./components/customer/PaymentSuccessful";
import { ShoppingCartProvider } from "./components/context/ShoppingCartContext";
import { Feedback } from "./components/customer/Feedback";
import { ManageUser } from "./components/restaurant/ManageUser";
import { ManageOrder } from "./components/restaurant/ManageOrder";
import { OrderTracking } from "./components/restaurant/OrderTracking";
import { OrderUpdates } from "./components/delivery/OrderUpdates";
import { Chat } from "./components/delivery/Chat";
import { RestaurantSummary } from "./components/restaurant/RestaurantSummary";

function AppRoutes() {
  return (
    <ShoppingCartProvider>
      <Header />
      <div className="AppRoutes">
        <Outlet />
      </div>
    </ShoppingCartProvider>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppRoutes />}>
          {/* customer */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse-menus" element={<BrowseMenus />} />
          <Route path="/restaurant-menus" element={<RestaurantMenu />} />
          <Route path="/confirm-address" element={<ConfirmAddress />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          <Route path="/payment-successful" element={<PaymentSuccessful />} />
          <Route path="/online-tracking" element={<OnlineTracking />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* delivery */}
          <Route path="/delivery-instructions" element={<DeliveryInstructions />} />
          <Route path="/order-updates" element={<OrderUpdates />} />
          <Route path="/chat" element={<Chat />} />
          {/* restaurant */}
          <Route path="/manage-users" element={<ManageUser />} />
          <Route path="/manage-order" element={<ManageOrder />} />
          <Route path="/manage-menus" element={<ManageMenus />} />
          <Route path="/restaurant-summary" element={<RestaurantSummary />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;