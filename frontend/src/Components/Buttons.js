import React from "react";
import { Oval } from "react-loader-spinner";

export default function Buttons({
  text,
  onClick,
  name,
  className,
  id,
  productid,
  isLoading,
}) {
  return (
    <div>
      <button
        name={name}
        onClick={onClick}
        className={
          isLoading
            ? ` bg-green-600  p-[4px] h-[30px] w-[100px] font-bold rounded-md text-white flex gap-[5px] justify-center items-center "`
            : className
        }
      >
        <span>
          {text ? text : id === productid ? "Show Less" : "Show More"}
        </span>
        {isLoading && (
          <Oval
            visible={true}
            height="15"
            width="15"
            color="white"
            ariaLabel="oval-loading"
          />
        )}
      </button>
    </div>
  );
}
