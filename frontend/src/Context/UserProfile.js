import { createContext, useState } from "react";
export const ProfileContext = createContext(null);
export const ProfileProvider = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <ProfileContext.Provider value={{ imageUrl, setImageUrl }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
