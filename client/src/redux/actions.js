import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const LOAD_ALL_PRODUCTS = "LOAD_ALL_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const GET_USER = "GET_USER";
export const GET_TOTAL_PRODUCTS = "GET_TOTAL_PRODUCTS";
export const GET_USER_LOGIN = "GET_USER_LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const USER_GET_ORDERS = "USER_GET_ORDERS";






export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: json.data,
      });
    } catch (error) {
      alert("Could not get products");
      console.log(error);
    }
  };
};

export const loadAllProducts = (payload) => {
  return { type: LOAD_ALL_PRODUCTS, payload: payload };
};

export const sortProducts = (payload) => {
  return { type: SORT_PRODUCTS, payload: payload };
};

export const filterProducts = (payload) => {
  return { type: FILTER_PRODUCTS, payload: payload };
};

export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      const product = await axios(`/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const productsCreate = (payload) => {
  return async function () {
    try {
      const res = await axios.post("/products", payload);
      return res;
    } catch (error) {
      alert("No se pudo crear el producto");
      console.log(error);
    }
  };
};

export const getTotalProducts = (products) => {
  return {
    type: GET_TOTAL_PRODUCTS,
    payload: products,
  };
};

export const getUser = (email) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/user/${email}`);
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    } catch (error) {
      alert("Could not get user profile", error.message);
    }
  };
};


export const getUserLogin = (email, payload) => {
  return async function (dispatch) {
    try {
      const json = await axios.post(`/user/login/${email}`, payload);
      return dispatch({
        type: GET_USER_LOGIN,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("Could not get user login", error.message);
    }
  };
};

export const userUpdate = (payload, user) => {
  return async function () {
    try {
      const res = await axios.put(`/user/${user}`, payload);
      return res;
    } catch (error) {
      console.log(error);
      alert("No se pudo actualizar los datos del usuario");
    }
  };
};

export const userGetOrders = (userId) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`order/find/${userId}`);
      return dispatch({
        type: USER_GET_ORDERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("Could not get orders from user", error.message);
    }
  };
};


export const handleCheckout = (cartProp, user) => {
  console.log(cartProp.cartItems);
  axios
    .post(`/stripe/create-checkout-session`, {
      cartItems: cartProp.cartItems,
      userId: user.id,
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => console.log(err.message));
};


// export const getRecipeDetail = (id) => {
//     return async function(dispatch) {
//         try {
//             await fetch(`http://localhost:3001/recipes/${id}`)
//             .then(res => res.json())
//             .then(data => dispatch({ type: GET_RECIPE_DETAIL, payload: data }))
//         } catch (error) {
//             alert('No se pudieron encontrar recetas con ese ID')
//             console.log(error)
//         }
//     }
// }

// export const cleanRecipeDetail = (payload) => {
//     return { type: 'CLEAN_RECIPE', payload: payload }
// };
