import React, { useState } from "react";
import Rating from "./Rating";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";

export default function Product({
  productid,
  price,
  rating,
  image,
  title,
  category,
}) {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className=" w-10/12 mb-5  ">
        <img
          className="mx-auto w-[340px] h-[340px] "
          src={image}
          alt="product"
        />
        <div className="w-full  flex flex-col items-center gap-[20px]">
          <div className="w-8/12 ">
            <div>{title.slice(0, 20)}</div>
            <div className="flex justify-center items-center gap-[10px]">
              <div className="text-green-700 font-bold">{`${price}$`}</div>
              <div>
                <Rating className="flex cursor-pointer" rating={rating} />
              </div>
            </div>
          </div>

          <Buttons
            className="bg-[#fbbf24] p-2 rounded-md w-[150px]  "
            text="CHECK OUT"
            onClick={() =>
              navigate("/Addtocart", { state:  productid })
            }
          />
        </div>
      </div>
    </div>
  );
}
