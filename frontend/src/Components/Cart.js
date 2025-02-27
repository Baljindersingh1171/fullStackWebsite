import React, { useEffect, useState } from "react";
import { getCartProducts } from "../apis/apis";
import { useNavigate } from "react-router-dom";
import Quantityprice from "./Quantityprice";
import { useContext } from "react";
import { CartBadgeContext } from "../Context/CartBadge";
import Cookies from "js-cookie";
import Buttons from "./Buttons";
import { toast } from "react-toastify";
export default function Cart() {
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const badge = useContext(CartBadgeContext);
  console.log("cartProducts", cartProducts);
  console.log(cartProducts.quantity, "cart product quantity");
  const [subTotal, setSubTotal] = useState(null);

  const display = async () => {
    const result = await getCartProducts();
    // if (result.data.message === "access denied") {
    //   navigate("/login");
    // }
    console.log("result in cart", result);
    // console.log("result.sucess=>", result.success);
    // console.log("result.data.success=>", result.data.success);
    if (!result) {
      toast.error("Session is expired please login again");
      Cookies.remove("accessToken");
      navigate("/login");
    } else {
      const totalCartItems = result?.data?.cart.reduce(
        (acc, currentvalue) => acc + currentvalue.quantity,
        0
      );
      const SubtotalPrice = result?.data?.cart.reduce(
        (acc, currentvalue) => acc + currentvalue.totalprice,
        0
      );
      setSubTotal(SubtotalPrice);
      console.log("subtotalprice", subTotal);
      badge.setCartBadge(totalCartItems ? totalCartItems : 0);
      console.log("result", result);
      setCartProducts(result ? result.data.cart : []);
    }
  };

  useEffect(() => {
    display();
  }, []);

  function handleClick() {}

  return (
    <div className="">
      {cartProducts.length !== 0 ? (
        <div className=" flex justify-center flex-col items-center mt-[100px] gap-[50px] border-b-[3px]  border-gray-500 w-[900px] pb-4 mx-auto pr-[70px]">
          <>
            <table className="table-auto text-[24px]  ">
              <thead>
                <tr className="">
                  <th className="">ITEM</th>
                  <th className=" pl-[50px]">PRICE</th>
                  <th className=" pl-[60px]">QUANTITY</th>
                  <th className=" pl-[70px]">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((product) => (
                  <>
                    <tr className="">
                      <td
                        className=" flex justify-start items-center gap-[17px] my-2 cursor-pointer"
                        onClick={() =>
                          navigate("/Addtocart", { state: product.productid })
                        }
                      >
                        <img src={product.image} alt="" className="w-6" />
                        {product?.title?.slice(0, 20)}
                      </td>
                      <td className=" pl-[60px]  my-4 ">{product.price}$</td>
                      <td className="  pl-[70px]  mt-4 ">
                        <Quantityprice
                          totalprice={product.totalprice}
                          price={product.price}
                          id={product._id}
                          setCartProducts={setCartProducts}
                          quantity={product.quantity}
                          display={display}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </>
        </div>
      ) : (
        <div className=" mt-[150px] flex justify-center font-bold text-xl">
          No Products
        </div>
      )}
      {cartProducts.length > 0 && (
        <div className="flex justify-center items-center gap-[50px]  mt-[20px] ">
          <div className="font-bold text-[25px]"> TOTAL PRICE:</div>
          <div className="font-bold ">------------------------------------</div>
          <div className="flex justify-center items-center gap-[100px]">
            <div className="font-bold text-[25px]">{Math.round(subTotal)}$</div>
            <Buttons
              className="bg-[#fbbf24] text-black p-[10px] h-[40px]  rounded-md"
              text="Proceed to buy"
              onClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
