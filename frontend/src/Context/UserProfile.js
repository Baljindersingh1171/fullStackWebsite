import { createContext, useState } from "react";
export const ProfileContext = createContext(null);
export const ProfileProvider = (props) => {
  const [imageName, setImageName] = useState(0);
  return (
    <ProfileContext.Provider value={{ imageName, setImageName }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
