import axios from "axios";
export const signup = async (email, confirmpassword) => {
  try {
    const result = await axios.post("/api/user/signup", {
      email: email,
      password: confirmpassword,
    });
    console.log(result);
    return result;
  } catch (err) {}
};
export const login = async (email, password) => {
  try {
    const result = await axios.post("/api/user/login", {
      email: email,
      password: password,
    });
    return result;
  } catch (err) {
    console.log("error", err);
    return err.response;
  }
};
export const logout = async () => {
  try {
    const result = await axios.get("/api/user/logout");
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async () => {
  const result = await axios.get("https://fakestoreapi.com/products");

  // console.log(result);
  return result;
};
export const getProduct = async (id) => {
  const result = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return result;
};
export const getProductsByCategory = async (category) => {
  const result = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return result;
};
// export const addToCart = async (
//   productid,
//   title,
//   price,
//   image,
//   quantity,
//   category
// ) => {
//   console.log("productid", productid);
//   try {
//     const response = await axios.post(`http://localhost:3000/products`, {
//       productid: productid,
//       title: title,
//       price: price,
//       image: image,
//       totalprice: price,
//       quantity: quantity,
//       category: category,
//     });
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };
export const addToCart = async (
  productid,
  title,
  price,
  image,
  quantity,
  category
) => {
  console.log("productid", productid);
  try {
    const response = await axios.post(
      `/api/user/cart`,
      {
        productid: productid,
        title: title,
        price: price,
        image: image,
        totalprice: price,
        quantity: quantity,
        category: category,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
// export const addToBadge = async (cartBadge) => {
//   console.log(cartBadge, "cartbade");
//   try {
//     await axios.patch(`http://localhost:3000/cartBadge/908`, {
//       cartBadge: cartBadge+1 ,
//     });
//   } catch (err) {
//     throw err;
//   }
// };
// export const getBadge=async()=>{
//   try{
//     const result=await axios.get(`http://localhost:3000/cartBadge`)

//     return result
//   }
//   catch(err){
//     throw(err)
//   }
// }
export const getCartProducts = async () => {
  try {
    const response = await axios.get(`/api/user/cart`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log("error", err);
    // return {
    //   success: false,
    //   error: err.response?.data,
    // };
  }
};
// export const getCartProducts = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/products`);
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };
export const deleteCartProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/user/cart/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
export const updateCartData = async (quantity, id, totalprice) => {
  try {
    await axios.patch(
      `/api/user/cart/${id}`,
      {
        quantity,
        totalprice,
      },
      { withCredentials: true }
    );
  } catch (err) {
    throw err;
  }
};
export const uploadProfile = async (formData) => {
  try {
    const result = await axios.post(`/api/user/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  } catch (err) {}
};
export const getProfile = async () => {
  try {
    const response = await axios.get(`/api/user/profile`, {
      responseType: "blob",
    });
    console.log("image", response);
    return response;
  } catch (err) {}
};
export const resetPassword = async (formData) => {
  try {
    const result = await axios.post(`/api/user/resetpassword`, formData);
    console.log("res", result);
    return result;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
export const verifyResetToken = async (resetToken) => {
  try {
    const result = await axios.get(`api/user/resetpassword/${resetToken}`);
    console.log("result of token verified or not", result);

    return result;
  } catch (err) {
    return err.response;
  }
};
export const updateUserPassword = async (resetToken, password) => {
  try {
    const result = await axios.post(
      `api/user/updateuserpassword/${resetToken}`,
      { password }
    );

    return result;
  } catch (err) {}
};
