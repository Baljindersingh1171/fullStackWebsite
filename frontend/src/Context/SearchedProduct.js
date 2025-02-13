import { createContext, useState } from "react";
export const SearchedProductContext = createContext(null);
export const SearchedProvider = (props) => {
  const [searchedProduct, setSearchedProduct] = useState(0);
  return (
    <SearchedProductContext.Provider value={{ searchedProduct, setSearchedProduct }}>
      {props.children}
    </SearchedProductContext.Provider>
  );
};
