import { createContext, useState } from "react";
export const Filterdatacontext = createContext(null);
export const Filterdataprovider = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  return (
    <Filterdatacontext.Provider value={{ filteredData, setFilteredData }}>
      {props.children}
    </Filterdatacontext.Provider>
  );
};
