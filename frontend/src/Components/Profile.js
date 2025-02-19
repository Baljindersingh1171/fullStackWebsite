import { getProfile, uploadProfile } from "../apis/apis";
import { useState, useRef, useContext } from "react";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ProfileContext } from "../Context/UserProfile";

function Profile({ setUserProfile }) {
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleUpload = async () => {
    // e.preventDefault();

    if (!selectedFile) {
      // setMessage("Please select a file to upload.");
      return;
    }

    try {
      setLoading(true);
      // setMessage("");
      const formData = new FormData();
      formData.append("profile", selectedFile);
      console.log("selectedfile", selectedFile);
      // formData.forEach((value, key) => {
      //   console.log(`${key}`, value);
      // });

      const result = await uploadProfile(formData);
      setUserProfile(false);
      console.log("result after file upload", result.data.filename);
      // setMessage("File uploaded successfully!");
      // const getimage = await getProfile(result.data.filename);

      // const Url = URL.createObjectURL(getimage.data);
      // console.log("URL", Url);
      image.setImageName(result.data.filename);
      // setImageUrl(Url);
      // console.log("imageurl", imageUrl);
      // console.log("getimage", getimage);
    } catch (error) {
      // setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
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
          className="bg-blue-400 p-[2px] text-white w-[60px]"
        >
          {loading ? "Uploading..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
