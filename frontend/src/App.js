import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { getCartProducts, getProfile } from "./apis/apis";
import Cookies from "js-cookie";

import { LoginContext } from "./Context/Login";

import { CartBadgeContext } from "./Context/CartBadge";
import { ProfileContext } from "./Context/UserProfile";
import UpdatePassword from "./Components/UpdatePassword";

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
  const accessToken = Cookies.get("accessToken");

  const image = useContext(ProfileContext);
  useEffect(() => {
    const display = async () => {
      const response = await getProfile();
      console.log("response", response);
      // console.log("success=>", response.data.success);

      if (response) {
        const imageUrl = URL.createObjectURL(response.data);
        console.log("imageUrl", imageUrl);
        image.setImageUrl(imageUrl);
      }
    };
    display();
  }, []);

  const display = async () => {
    const result = await getCartProducts();
    if (result && result.data.cart.length > 0) {
      const totalCartItems = result.data.cart.reduce(
        (acc, currentvalue) => acc + currentvalue.quantity,
        0
      );
      badge.setCartBadge(totalCartItems);
    }
  };

  useEffect(() => {
    accessToken && display();
  }, []);

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
          <Route path="/:resetToken" element={<UpdatePassword />} />

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
