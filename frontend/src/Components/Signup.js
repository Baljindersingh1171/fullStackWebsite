import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import ContinueWithgoogle from "./ContinueWithgoogle";
import closedEye from "../assests/images/closedeye.png";
import openEye from "../assests/images/openeye.png";
import Buttons from "./Buttons";
import { signup } from "../apis/apis";
export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneno: "",
    password: "",
    confirmpassword: "",
    termsandconditions: false,
  });
  const [confirmpasswordType, setConfirmpasswordType] = useState("password");
  const [passwordType, setpasswordType] = useState("password");
  const [passwordimgsrc, setpasswordimgsrc] = useState(closedEye);
  const [confirmpasswordsrc, setconfirmpasswordsrc] = useState(closedEye);
  const usernameregex = /^[a-zA-Z][a-zA-Z0-9_ ]{5,14}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,15}$/;

  let indiaRegex = /^[7-9]{1}[0-9]{9}$/;

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    check();
  }

  const check = async () => {
    toast.dismiss();
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.phoneno === "" ||
      formData.password === "" ||
      formData.confirmpassword === "" ||
      formData.termsandconditions === false
    ) {
      toast.error("All fields are required");
    } else if (!usernameregex.test(formData.username)) {
      toast.error("Invalid Username");
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email");
    } else if (!passwordRegex.test(formData.password)) {
      toast.error("Invalid Password");
    } else if (!indiaRegex.test(formData.phoneno)) {
      toast.error("Invalid Phone no.");
    } else if (formData.password !== formData.confirmpassword) {
      toast.error("Confirm password should match with password");
    } else {
      try {
        // await createUserWithEmailAndPassword(auth,formData.email,formData.password);
        // await updateProfile(auth.currentUser,{displayName:formData?.username})
        const result = await signup(
          // formData.username,
          formData.email,
          // formData.phoneno,
          formData.confirmpassword
        );
        console.log("result", result.data.msg);
        if (result) {
          toast.success(result.data.msg);
        }
      } catch (err) {
        // toast.error(err.message);
        console.log(err);
      }
      setFormData({
        username: "",
        email: "",
        phoneno: "",
        password: "",
        confirmpassword: "",
        termsandconditions: false,
      });
    }
  };

  function handeleye1click() {
    if (passwordimgsrc === closedEye) {
      setpasswordimgsrc(openEye);
      setpasswordType("text");
    } else {
      setpasswordimgsrc(closedEye);
      setpasswordType("password");
    }
  }
  function handeleye2click() {
    if (confirmpasswordsrc === closedEye) {
      setconfirmpasswordsrc(openEye);
      setConfirmpasswordType("text");
    } else {
      setconfirmpasswordsrc(closedEye);
      setConfirmpasswordType("password");
    }
  }

  return (
    <div className="bg-gray-200 flex justify-center  w-[400px] h-[83vh] mx-auto mt-[70px] rounded-md">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center items-center  gap-[15px]   "
      >
        <h1 className="font-bold text-2xl ">SignUp</h1>
        <input
          type="text"
          onChange={handleChange}
          className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
          placeholder="Username"
          value={formData.username}
          name="username"
        />
        <input
          type="email"
          onChange={handleChange}
          className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
          placeholder="Email"
          value={formData.email}
          name="email"
        />
        <input
          id="phone"
          type="tel"
          onChange={handleChange}
          className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
          placeholder="Phone No."
          value={formData.phoneno}
          name="phoneno"
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
            src={passwordimgsrc}
            class="eye"
            onClick={handeleye1click}
            className="h-[30px] w-[30px] ml-[-25px]"
          />
        </div>

        <div className="flex">
          <input
            type={confirmpasswordType}
            onChange={handleChange}
            className="outline-none  h-[30px] w-[300px] border-b-[2px] border-black  bg-gray-200"
            placeholder="Confirmpassword"
            value={formData.confirmpassword}
            name="confirmpassword"
          />
          <img
            src={confirmpasswordsrc}
            alt="eye icon"
            class="eye"
            onClick={handeleye2click}
            className="h-[30px] w-[30px] ml-[-25px]"
          />
        </div>

        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            name="termsandconditions"
            checked={formData.termsandconditions}
          />
          Terms & Conditions
        </label>
        <Buttons
          text="SignUp"
          className="bg-green-600  p-[8px] h-[40px] w-[100px] font-bold rounded-md text-white"
        />
        <p>
          Already have an account{" "}
          <Link to="/login" className="text-blue-700">
            Login
          </Link>
        </p>
        <ContinueWithgoogle />
        {/* <Link to="/ResetPassword" className="text-blue-700 ">
          Forgot Password?
        </Link> */}
      </form>
    </div>
  );
}
