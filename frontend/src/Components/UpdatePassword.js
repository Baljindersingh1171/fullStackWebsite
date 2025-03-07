import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyResetToken, updateUserPassword } from "../apis/apis";
import Buttons from "./Buttons";
import { toast } from "react-toastify";
function UpdatePassword() {
  const { resetToken } = useParams();
  console.log("resetToken", resetToken);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%?&])[A-Za-z\d@.#$!%?&]{8,15}$/;
  useEffect(() => {
    console.log("resetToken");
    const verify = async () => {
      try {
        const result = await verifyResetToken(resetToken);
        if (result.status !== 200) {
          setIsValid(false);
          toast.error(result.data.msg);
        }
      } catch (err) {}
    };
    verify();
  }, [resetToken]);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.password === "" || formData.confirmPassword === "") {
      toast.error("Password is required");
    } else if (!passwordRegex.test(formData.password)) {
      toast.error("Invalid Password");
    } else if (formData.password !== formData.confirmPassword) {
      toast.error(" password mismatch!");
    } else {
      setIsLoading(true);
      try {
        const result = await updateUserPassword(
          resetToken,
          formData.confirmPassword
        );

        setIsLoading(false);
        toast.success(result.data.msg);
        setFormData({ password: "", confirmPassword: "" });
        navigate("/login");
      } catch (err) {}
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="h-[50vh] flex justify-center items-center bg-gray-200 w-[400px] mx-auto mt-[200px] ">
      {isValid ? (
        <form className="flex flex-col justify-center items-center gap-[20px]">
          <h1 className="font-bold text-2xl">Update Password</h1>
          <input
            type="password"
            placeholder="newPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-200 outline-none border-b-[2px] border-black "
          ></input>
          <input
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-200 outline-none border-b-[2px] border-black "
          ></input>
          <div className="flex justify-center items-center gap-[10px]">
            <Buttons
              text={isLoading ? "RESETING..." : "RESET"}
              onClick={handleReset}
              className="bg-green-600  p-[4px] h-[30px] w-[70px] font-bold rounded-md text-white"
              isLoading={isLoading}
            />

            {/* <button>RESET</button> */}
            <Buttons
              name="back"
              onClick={handleBack}
              className="bg-blue-600  p-[4px] h-[30px] w-[70px] font-bold rounded-md text-white"
              text="BACK"
            />
          </div>
        </form>
      ) : (
        navigate("/ResetPassword")
      )}
    </div>
  );
}

export default UpdatePassword;
