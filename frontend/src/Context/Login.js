import { createContext, useState } from "react";
export const LoginContext = createContext(null);
export const AuthProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};
