import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getProducts } from "../apis/apis";
import { useContext } from "react";
import { Filterdatacontext } from "../Context/FilteredData";
import { SearchedProductContext } from "../Context/SearchedProduct";

export default function Searchbar({ allproducts, getAllProducts }) {
  const input = useContext(SearchedProductContext);
  const data = useContext(Filterdatacontext);

  // const [searchedProduct, setSearchedProduct] = useState("");

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    // setSearchedProduct(searchValue);
    input.setSearchedProduct(searchValue);
    data.setFilteredData(
      allproducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  // setProducts(filteredProducts);

  // console.log("filteredProducts",filteredProducts)
  return (
    <div>
      <div className="flex justify-center items-center ">
        <input
          className="ml-[px] border-none h-[35px] rounded-md outline-none text-2lg"
          type="text"
          placeholder="search product"
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
    </div>
  );
}
