import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "react-toastify";
export default function ResetPassword() {
  const [email, setEmail] = useState("");

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  function handleChange(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name === "back") {
      navigate("/");
    } else if (email === "") {
      alert("Email is required");
    } else {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password is reset successfully");
        setEmail("");
        navigate("/login");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="flex flex-col  justify-center items-center">
        <h1>Reset Password</h1>
        <input
          type="email"
          onChange={handleChange}
          className="inputs"
          placeholder="Email"
          value={email}
          name="email"
        />
        <div style={{ display: "flex", gap: "20px" }}>
          <Buttons
            text="RESET"
            onClick={(e) => handleSubmit(e)}
            className="resetbtn"
          />
          <Buttons
            name="back"
            className="backbtn"
            text="BACK"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  );
}
