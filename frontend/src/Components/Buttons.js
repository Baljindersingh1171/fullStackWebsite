import React from "react";

export default function Buttons({
  text,
  onClick,
  name,
  className,
  id,
  productid,
}) {
  return (
    <div>
      <button name={name} onClick={onClick} className={className}>
        {text ? text : id === productid ? "showless" : "showmore"}
      </button>
    </div>
  );
}
