import React, { useEffect, useState } from "react";
import Productcard from "./Productcard";
import { useContext } from "react";
import { Filterdatacontext } from "../Context/FilteredData";
import { SearchedProductContext } from "../Context/SearchedProduct";

export default function Products({handleClick}) {
  const input = useContext(SearchedProductContext);
  const data = useContext(Filterdatacontext);
  const filteredData = data.filteredData;

  console.log(filteredData, "filtered Data in products page");
  console.log(input.searchedProduct.length);
  if (filteredData.length === 0) {
    if (input.searchedProduct !== 0) {
      return (
        <p className="flex justify-center items-center mt-[250px] font-bold text-xl">
          No Product Found
        </p>
      );
    } else {
      return (
        <p className="flex justify-center items-center mt-[250px] font-bold text-xl">
          Loading...
        </p>
      );
    }
  } else {
    return (
      <div className="flex  justify-center items-center flex-wrap gap-[30px] ml-[100px] mt-[100px]" onClick={handleClick}>
        {filteredData.map((product) => (
          <Productcard
            productid={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating.rate}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    );
  }
}
