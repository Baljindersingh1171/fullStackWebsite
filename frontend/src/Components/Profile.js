import { uploadProfile } from "../apis/apis";
import { useState } from "react";

function Profile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const upload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    console.log("formData", formData);

    try {
      setLoading(true);
      setMessage("");
      const response = await uploadProfile(formData);
      setMessage("File uploaded successfully!");
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={upload}>
        <input
          type="file"
          name="profile"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
