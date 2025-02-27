import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addToBadge,
  getCartProducts,
  getProduct,
  getProducts,
} from "../apis/apis";
import ReactImageMagnify from "react-image-magnify";
import Rating from "./Rating";
import Buttons from "./Buttons";
import { addToCart } from "../apis/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartBadgeContext } from "../Context/CartBadge";
import { LoginContext } from "../Context/Login";
import { CartIdContext } from "../Context/CartId";
import Cookies from "js-cookie";

export default function Addtocart() {
  const badge = useContext(CartBadgeContext);
  const userlogin = useContext(LoginContext);
  const cart = useContext(CartIdContext);
  const accessToken = Cookies.get("accessToken");

  const [product, setproduct] = useState("");
  const location = useLocation();
  console.log("location.state", location.state);
  const productid = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [currentid, setCurrentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const display = async () => {
      console.log("productId", productid);
      const result = await getProduct(productid);
      console.log("getproduct", result.data);
      setproduct(result.data);
      setIsLoading(false);
    };
    display();
  }, []);
  const quantity = 1;

  const handleClick = async () => {
    if (accessToken) {
      try {
        const result = await addToCart(
          product.id,
          product.title,
          product.price,
          product.image,
          quantity,
          product.category
        );
        console.log("result of add to cart", result);
        if (result.success) {
          console.log("cart result", result);

          // await addToBadge(cartBadge);
          const cartProducts = await getCartProducts();
          // console.log("products",cartProducts.data.length)
          toast.success("Product is added successfully");
          navigate("/Cart");
        } else {
          toast.error("Session is expired please login again");
          Cookies.remove("accessToken");
          navigate("/login");
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      navigate("/login");
    }
  };
  const handleShowMore = (myid) => {
    if (currentid !== myid) {
      setCurrentId(myid);
    } else {
      setCurrentId(null);
    }
  };
  console.log("cutrent id", currentid);

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-around   ">
          <div className="  ml-[100px] mt-[100px]">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: false,
                  src: product.image,
                  width: 500,
                  height: 500,
                },
                largeImage: {
                  src: product.image,
                  width: 1500,
                  height: 1500,
                },
                lensStyle: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                enlargedImageContainerDimensions: {
                  width: "130%",
                  height: "130%",
                },
              }}
            />
          </div>
          <div className=" flex flex-col gap-[25px]  pt-[100px] w-[450px] text-2xl">
            <div className="font-bold">{product.title}</div>

            {product.productid === currentid ? (
              <div className="">
                <span className="font-bold">Description:-</span>
                {product.description}
              </div>
            ) : (
              <div>
                <span className="font-bold">Description:-</span>
                {product?.description?.slice(0, 80)}
              </div>
            )}
            <Buttons
              onClick={() => handleShowMore(product.productid)}
              productid={product.productid}
              id={currentid}
              className="text-blue-600"
            />
            <Rating
              rating={product.rating?.rate}
              className="flex cursor-pointer"
            />

            <div className="text-green-700">{product.price}$</div>
            <Buttons
              className="bg-blue-950 text-white border-none p-[7px] h-[50px] w-[130px] rounded-md text-lg"
              onClick={() => handleClick()}
              text="ADD TO CART"
            />
          </div>
        </div>
      ) : (
        <p className="flex  justify-center mt-[200px] ">Loading....</p>
      )}
    </>
  );
}
