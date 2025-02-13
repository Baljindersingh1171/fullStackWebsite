import React from "react";

import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContinueWithgoogle from "./ContinueWithgoogle";
import closedEye from "../assests/images/closedeye.png";
import openEye from "../assests/images/openeye.png";
import { login } from "../apis/apis";
import { LoginContext } from "../Context/Login";
import Buttons from "./Buttons";
export default function Login() {
  const navigate = useNavigate();
  const userlogin = useContext(LoginContext);
  console.log("userlogin", userlogin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setpasswordType] = useState("password");
  const [passwordimgsrc, setpasswordimgsrc] = useState(closedEye);
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (formData.email === "" || formData.password === "") {
      toast.error("All fields are required");
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email");
    } else {
      try {
        //  const data= await signInWithEmailAndPassword(auth,formData.email,formData.password);
        //  console.log("data",data);
        const data = await login(formData.email, formData.password);
        console.log("login data", data);
        toast.success("Login Successfully");
        userlogin.setIsLogin(data.data.success);
        setFormData({ email: "", password: "" });

        // navigate('/home',{ state: { displayName: data?.user?.displayName } })
        navigate("/home");
      } catch (error) {
        let message = error.message;
        toast.error(message);
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handeleyeclick() {
    if (passwordimgsrc === closedEye) {
      setpasswordimgsrc(openEye);
      setpasswordType("text");
    } else {
      setpasswordimgsrc(closedEye);
      setpasswordType("password");
    }
  }

  return (
    <div className="bg-gray-200 flex justify-center w-[400px] mx-auto mt-[100px] rounded-md">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center items-center  gap-[20px] p-[30px] "
      >
        <h1 className="font-bold text-2xl">Login</h1>
        <input
          type="email"
          onChange={handleChange}
          className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
          placeholder="Email"
          value={formData.email}
          name="email"
        />
        <div className="flex">
          <input
            type={passwordType}
            onChange={handleChange}
            className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
            placeholder="Password"
            value={formData.password}
            name="password"
          />

          <img
            alt="eye icon"
            className="h-[30px] w-[30px] ml-[-25px]"
            src={passwordimgsrc}
            onClick={handeleyeclick}
          />
        </div>

        <Buttons
          text="LOGIN"
          className="bg-green-600  p-[8px] h-[40px] w-[100px] font-bold rounded-md text-white"
        />

        <p>
          Not have an account?{" "}
          <Link to="/Signup" className="text-blue-700">
            SignUp
          </Link>
        </p>
        <ContinueWithgoogle />
        <p
          className="text-blue-700 cursor-pointer"
          onClick={() => navigate("/ResetPassword")}
        >
          Forgot Password?
        </p>
        {/* <Link to="/ResetPassword" className="text-blue-700">
          Forgot Password?
        </Link> */}
      </form>
    </div>
  );
}
