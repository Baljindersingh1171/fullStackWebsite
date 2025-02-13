import { createContext, useState } from "react";
export const CartBadgeContext = createContext(null);
export const CartBadgeProvider = (props) => {
  const [cartBadge, setCartBadge] = useState(0);
  return (
    <CartBadgeContext.Provider value={{ cartBadge, setCartBadge }}>
      {props.children}
    </CartBadgeContext.Provider>
  );
};
