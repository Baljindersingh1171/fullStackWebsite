import React, { useEffect, useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useContext } from "react";
import { CartBadgeContext } from "../Context/CartBadge";
import {
  deleteCartProduct,
  getCartProducts,
  updateCartData,
} from "../apis/apis";

export default function Quantityprice({
  totalprice,
  id,
  setCartProducts,
  quantity,
  display,
  price,
}) {
  const [count, setCount] = useState(1);
  // const [total, setTotal] = useState(price);
  const badge = useContext(CartBadgeContext);

  const [isClicked, setIsClicked] = useState(false);
  const [total, setTotal] = useState(price);
  console.log("total price", totalprice);
  const update = async () => {
    await updateCartData(count, id, total);
    await display();
  };
  console.log("quantity of product", quantity);

  function handleIncrement() {
    setIsClicked(true);
    const newCount = quantity + 1;
    setCount(quantity + 1);
    setTotal(price * newCount);
    updateCartData(newCount, id, price * newCount).then(display);
  }

  // useEffect(() => {
  //   // if (isClicked) {
  //   update();
  //   // }
  // }, [count]);

  function handleDecrement() {
    if (quantity > 1) {
      const newCount = quantity - 1;
      setCount(quantity - 1);
      setTotal(price * newCount);
      updateCartData(newCount, id, price * newCount).then(display);
    }
  }
  const handleDelete = async (myid) => {
    try {
      await deleteCartProduct(myid);
      await display();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex relative items-center gap-[5px]   ">
      <div onClick={handleDecrement}>
        <FaCircleMinus />
      </div>
      <div>{quantity}</div>
      <div onClick={handleIncrement}>
        <FaCirclePlus />
      </div>
      <div className="ml-[30px] absolute left-[166px]  ">
        {Math.round(totalprice)}$
      </div>
      <div
        className="absolute left-[300px] cursor-pointer "
        onClick={() => handleDelete(id)}
      >
        {" "}
        <ImCross />
      </div>
    </div>
  );
}
