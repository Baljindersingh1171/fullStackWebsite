import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { resetPassword } from "../apis/apis";
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleBack() {
    navigate("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      toast.error("Email is  required");
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email");
    } else {
      try {
        // await sendPasswordResetEmail(auth, email);'
        setIsLoading(true);
        const result = await resetPassword(formData);

        console.log("result", result);
        if (result.status === 200) {
          toast.success(result.data.msg);
          navigate("/login");
          setIsLoading(false);
        } else {
          toast.error(result.data.msg);
          setIsLoading(false);
        }

        // setEmail("");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center   w-[400px] mx-auto mt-[200px] bg-gray-200 p-[20px]">
      <form className="flex flex-col  justify-center items-center gap-[20px]">
        <h1 className="font-bold text-2xl">Reset Password</h1>
        <input
          type="email"
          onChange={handleChange}
          className="bg-gray-200  border-b-[2px] border-black outline-none  w-[250px] "
          placeholder="Email"
          value={formData.email}
          name="email"
        />
        <div style={{ display: "flex", gap: "20px" }}>
          <Buttons
            text={isLoading ? "Loading..." : "RESET"}
            onClick={(e) => handleSubmit(e)}
            className="bg-green-600  p-[4px] h-[30px] w-[70px] font-bold rounded-md text-white"
            isLoading={isLoading}
          />

          {/* <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> */}
          {/* <Buttons /> */}
          <Buttons
            name="back"
            className="bg-blue-600  p-[4px] h-[30px] w-[70px] font-bold rounded-md text-white"
            text="BACK"
            onClick={handleBack}
          />
        </div>
      </form>
    </div>
  );
}
