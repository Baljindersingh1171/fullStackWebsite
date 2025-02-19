import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ResetPassword from "./Components/ResetPassword";
import "./main.css";
import { useState } from "react";
import Getbycategory from "./Components/Getbycategory";
import Cart from "./Components/Cart";
import Addtocart from "./Components/Addtocart";
import Nav from "./Components/Nav";
import { useEffect, useContext } from "react";
import { getCartProducts } from "./apis/apis";

import { LoginContext } from "./Context/Login";

import { CartBadgeContext } from "./Context/CartBadge";

function App() {
  const mensClothCategory = "men's clothing";
  const womenCLothCategory = "women's clothing";
  const electronicsCategory = "electronics";
  const JeweleriesCategory = "jewelery";
  const badge = useContext(CartBadgeContext);
  const [radiovalue, setRadioValue] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const userlogin = useContext(LoginContext);
  if (userlogin.isLogin) {
    const display = async () => {
      const result = await getCartProducts();
      if (result.data.length > 0) {
        const totalCartItems = result.data.reduce(
          (acc, currentvalue) => acc + currentvalue.quantity,
          0
        );
        badge.setCartBadge(totalCartItems);
      }
      display();
    };
  }

  const handleClick = () => {
    setIsVisible(false);
    setUserProfile(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home handleClick={handleClick} />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Addtocart" element={<Addtocart />} />

          <Route
            path="/Mens"
            element={
              <Getbycategory
                category={mensClothCategory}
                radiovalue={radiovalue}
                // setIsChecked={setIsChecked}
              />
            }
          />
          <Route
            path="/Womens"
            element={
              <Getbycategory
                category={womenCLothCategory}
                radiovalue={radiovalue}
              />
            }
          />
          <Route
            path="/Electronics"
            element={
              <Getbycategory
                category={electronicsCategory}
                radiovalue={radiovalue}
              />
            }
          />
          <Route
            path="/Jeweleries"
            element={
              <Getbycategory
                category={JeweleriesCategory}
                radiovalue={radiovalue}
              />
            }
          />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Nav
          radiovalue={radiovalue}
          setRadioValue={setRadioValue}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      </BrowserRouter>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
