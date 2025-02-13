import { createContext, useState } from "react";
export const CartIdContext = createContext(null);
export const CartIdProvider = (props) => {
  const [cartId, setCartId] = useState('');
  return (
    <CartIdContext.Provider value={{ cartId, setCartId }}>
      {props.children}
    </CartIdContext.Provider>
  );
};
