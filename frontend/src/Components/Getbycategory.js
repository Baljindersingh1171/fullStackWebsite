import React, { useEffect, useState } from "react";
import { getProductsByCategory } from "../apis/apis";
import Productcard from "./Productcard";
import { useContext } from "react";
import { Filterdatacontext } from "../Context/FilteredData";
import { SearchedProductContext } from "../Context/SearchedProduct";
export default function Getbycategory({ category, radiovalue}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Data = useContext(Filterdatacontext);
  const filteredData = Data.filteredData;
  console.log("filtered data in category", filteredData);
  const input = useContext(SearchedProductContext);

 

  // useEffect(() => {
  //   if (isChecked) {
  //     setData((prevData) => [...prevData].sort((a, b) => a.price - b.price));
  //     console.log("Sorting applied");
  //   } else {
  //     setData(data);
  //     console.log("Resetting data");
  //   }
  // }, [isChecked]);
  useEffect(()=>{
 
    if(radiovalue==="hightolow")
      {
        console.log("high to low")
        setData((prevData) => [...prevData].sort((a, b) => b.price - a.price));

      }
      else if(radiovalue==="lowtohigh"){
        setData((prevData) => [...prevData].sort((a, b) => a.price - b.price));
      }
      else{
        setData(data);

      }

  },[radiovalue])

  useEffect(() => {
    const display = async () => {
      const result = await getProductsByCategory(category);
      console.log("filter", filteredData);
      if (filteredData.length < 20) {
        setData(filteredData);
      } else {
        setData(result.data);
      }
      setIsLoading(false);
      console.log("result", result.data);
      console.log("I am in category page");
    };

    display();
  }, [category, filteredData]);
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
    console.log("data", data);

    return (
      <div>
        <div className="flex ml-[100px] gap-[30px] flex-wrap mt-[100px]">
          {data.map((product) => (
            <Productcard
              productid={product.id}
              price={product.price}
              rating={product.rating.rate}
              image={product.image}
              title={product.title}
            />
          ))}
        </div>
      </div>
    );
  }
}
