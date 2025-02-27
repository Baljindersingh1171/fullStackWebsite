import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyResetToken, updateUserPassword } from "../apis/apis";
function UpdatePassword() {
  const { resetToken } = useParams();
  console.log("resetToken", resetToken);
  useEffect(() => {
    console.log("resetToken");
    const verify = async () => {
      const result = await verifyResetToken(resetToken);
      console.log("result of verification", result);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserPassword(resetToken, formData.confirmPassword);
  };

  return (
    <div className="h-[100vh] flex justify-center  items-center">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="password"
          placeholder="newPassword"
          name="password"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
        ></input>
        <button>RESET</button>
      </form>
    </div>
  );
}

export default UpdatePassword;
