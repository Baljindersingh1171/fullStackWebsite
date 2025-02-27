import { getProfile, uploadProfile } from "../apis/apis";
import { useState, useRef, useContext } from "react";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ProfileContext } from "../Context/UserProfile";
import { toast } from "react-toastify";

function Profile({ setUserProfile }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const image = useContext(ProfileContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file name", file);
    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      // setMessage("Please select a file to upload.");
      console.log("clicked");
      toast.error("Please select a file to upload");
      return;
    } else {
      try {
        setLoading(true);
        // setMessage("");
        const formData = new FormData();
        formData.append("profile", selectedFile);

        await uploadProfile(formData);

        const response = await getProfile();
        console.log("response", response);

        if (response) {
          const imageUrl = URL.createObjectURL(response.data);
          console.log("imageUrl", imageUrl);
          image.setImageUrl(imageUrl);
        }
        setUserProfile(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" h-[100px]  w-[100px] mx-auto p-[10px] ">
      <form className="flex flex-col items-center gap-[15px]">
        <div className="flex justify-center items-center gap-[10px]">
          {selectedFile ? (
            <img src={imageUrl} className="h-[20px] w-[20px] rounded-[100px]" />
          ) : (
            <FaUser color="black" size="20px" cursor="pointer" />
          )}

          <MdEdit
            size={24}
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => fileInputRef.current.click()}
          />
        </div>

        <input
          type="file"
          name="profile"
          onChange={handleFileChange}
          ref={fileInputRef}
          hidden
        />

        <button
          disabled={loading}
          onClick={handleUpload}
          className="bg-blue-400 p-[2px] text-white w-[70px] rounded-md"
        >
          {loading && selectedFile ? "Updating.." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
