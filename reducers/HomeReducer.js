import { axiosInstance } from "../Axios";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../src/utils/apiList";

const HomeReducer = createSlice({
  name: "home",
  initialState: {
    success: false,
    error: null,
    loading: false,
    banner: null,
    category: null,
    product: null,
    productPro: null,
    productTop: null,
    productBottom: null,
    productHot: null,
    pc: null,
    pbarcode: null,
    psearch: null,
    customer: null,
    order: null,
    orderdetail: null,
    orderAll: null,
    orderProduct: null,
    changepassword: null,
    updateuser: null,
    sales: null,
    salespayment: null,
    salespoint: null,
    allCustomer: null,
    managerpay: null,
    productAll: null,
    login: null,
  },
  reducers: {
    searchRequest(state, action) {
      state.loading = true;
    },
    searchSuccess(state, action) {
      state.loading = false;
      state.banner = action.payload;
      state.error = null;
    },
    searchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    categoryRequest(state, action) {
      state.loading = true;
    },
    categorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload;
      state.error = null;
    },
    categoryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest(state, action) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.login = action.payload;
      AsyncStorage.setItem("login", JSON.stringify(action.payload)); 
      AsyncStorage.removeItem("sales");
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productRequest(state, action) {
      state.loading = true;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProRequest(state, action) {
      state.loading = true;
    },
    updateProSuccess(state, action) {
      state.loading = false;
      state.productPro = action.payload;
      state.error = null;
    },
    updateProFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productTopRequest(state, action) {
      state.loading = true;
    },
    productTopSuccess(state, action) {
      state.loading = false;
      state.productTop = action.payload;
      state.error = null;
    },
    productTopFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productBottomRequest(state, action) {
      state.loading = true;
    },
    productBottomSuccess(state, action) {
      state.loading = false;
      state.productBottom = action.payload;
      state.error = null;
    },
    productBottomFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productHotRequest(state, action) {
      state.loading = true;
    },
    productHotSuccess(state, action) {
      state.loading = false;
      state.productHot = action.payload;
      state.error = null;
    },
    productHotFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    pcategoryRequest(state, action) {
      state.loading = true;
    },
    pcategorySuccess(state, action) {
      state.loading = false;
      state.pc = action.payload;
      state.error = null;
    },
    pcategoryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    pbarcodeRequest(state, action) {
      state.loading = true;
    },
    pbarcodeSuccess(state, action) {
      state.loading = false;
      state.pbarcode = action.payload;
      state.error = null;
    },
    pbarcodeFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    psearchRequest(state, action) {
      state.loading = true;
    },
    psearchSuccess(state, action) {
      state.loading = false;
      state.psearch = action.payload;
      state.error = null;
    },
    psearchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    customerRequest(state, action) {
      state.loading = true;
    },
    customerSuccess(state, action) {
      state.loading = false;
      state.customer = action.payload;
      state.error = null;
    },
    customerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderRequest(state, action) {
      state.loading = true;
    },
    orderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    orderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailRequest(state, action) {
      state.loading = true;
    },
    orderDetailSuccess(state, action) {
      state.loading = false;
      state.orderdetail = action.payload;
      state.error = null;
    },
    orderDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ordergetRequest(state, action) {
      state.loading = true;
    },
    ordergetSuccess(state, action) {
      state.loading = false;
      state.orderAll = action.payload;
      state.error = null;
    },
    ordergetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderProductDetailRequest(state, action) {
      state.loading = true;
    },
    orderProductDetailSuccess(state, action) {
      state.loading = false;
      state.orderProduct = action.payload;
      state.error = null;
    },
    orderProductDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    changepasswordRequest(state, action) {
      state.loading = true;
    },
    changepasswordSuccess(state, action) {
      state.loading = false;
      state.changepassword = action.payload;
      state.error = null;
    },
    changepasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateuserRequest(state, action) {
      state.loading = true;
    },
    updateuserSuccess(state, action) {
      state.loading = false;
      state.updateuser = action.payload;
      state.error = null;
    },
    updateuserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    salesRequest(state, action) {
      state.loading = true;
    },
    salesSuccess(state, action) {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    },
    salesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    salespayRequest(state, action) {
      state.loading = true;
    },
    salespaySuccess(state, action) {
      state.loading = false;
      state.salespayment = action.payload;
      state.error = null;
    },
    salespayFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    salesPointRequest(state, action) {
      state.loading = true;
    },
    salesPointSuccess(state, action) {
      state.loading = false;
      state.salespoint = action.payload;
      state.error = null;
    },
    salesPointFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    showCustomerRequest(state, action) {
      state.loading = true;
    },
    showCustomerSuccess(state, action) {
      state.loading = false;
      state.allCustomer = action.payload;
      state.error = null;
    },
    showCustomerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    managerpayRequest(state, action) {
      state.loading = true;
    },
    managerpaySuccess(state, action) {
      state.loading = false;
      state.managerpay = action.payload;
      state.error = null;
    },
    managerpayFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productAllRequest(state, action) {
      state.loading = true;
    },
    productAllSuccess(state, action) {
      state.loading = false;
      state.productAll = action.payload;
      state.error = null;
    },
    productAllFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions } = HomeReducer;
const config = {
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
};
export const {
  searchRequest,
  searchSuccess,
  searchFail,
  loginRequest,
  loginSuccess,
  loginFail,
  categoryRequest,
  categorySuccess,
  categoryFail,
  productRequest,
  productSuccess,
  productFail,
  updateProRequest,
  updateProSuccess,
  updateProFail,
  productTopRequest,
  productTopSuccess,
  productTopFail,
  productBottomRequest,
  productBottomSuccess,
  productBottomFail,
  productHotRequest,
  productHotSuccess,
  productHotFail,
  pcategoryRequest,
  pcategorySuccess,
  pcategoryFail,
  pbarcodeRequest,
  pbarcodeSuccess,
  pbarcodeFail,
  psearchRequest,
  psearchSuccess,
  psearchFail,
  customerRequest,
  customerSuccess,
  customerFail,
  orderRequest,
  orderSuccess,
  orderFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  ordergetRequest,
  ordergetSuccess,
  ordergetFail,
  orderProductDetailRequest,
  orderProductDetailSuccess,
  orderProductDetailFail,
  changepasswordRequest,
  changepasswordSuccess,
  changepasswordFail,
  updateuserRequest,
  updateuserSuccess,
  updateuserFail,
  salesRequest,
  salesSuccess,
  salesFail,
  salespayRequest,
  salespaySuccess,
  salespayFail,
  salesPointRequest,
  salesPointSuccess,
  salesPointFail,
  showCustomerRequest,
  showCustomerSuccess,
  showCustomerFail,
  managerpayRequest,
  managerpaySuccess,
  managerpayFail,
  productAllRequest,
  productAllSuccess,
  productAllFail,
} = actions;

export const loginDispatch = (bodyData, navigation) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axiosInstance.post("/login", bodyData, config);
// console.log(data,'data')
    dispatch(loginSuccess(data));
    //  console.log("data", data);

    if (data?.result?.role === "salesman") {
      dispatch(salemanDispatch(data.result?.id ,data?.token));
      navigation.navigate("Landing");
    } else {
      navigation.navigate("Profile2");
      // navigation.navigate("landing");
    }
  } catch (error) {
    //  console.log("error", error.response.data.message);
    Alert.alert(error.response.data.message);
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const changepasswordDispatch =
  (bodyData, id, token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch(changepasswordRequest());
      const { data } = await axiosInstance.post(
        `/users/${id}/changepassword`,
        bodyData,
        config
      );

      dispatch(changepasswordSuccess(data));
      //  console.log("data", data);
      if (data) {
        Alert.alert("Password Updated Successfully");
        // navigation.navigate("Landing");
      }
      // if (data?.result?.role === "salesman") {
      //   navigation.navigate("Landing");
      // } else {
      //   navigation.navigate("Profile2");
      //   // navigation.navigate("landing");
      // }
    } catch (error) {
      //  console.log("error", error.response.data.message);
      Alert.alert(error.response.data.message);
      dispatch(
        changepasswordFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
export const updateUserDispatch = (bodyData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(updateuserRequest());
    const { data } = await axiosInstance.post("/updateuser", bodyData, config);

    dispatch(updateuserSuccess(data));
    //  console.log("data", data);
    // if (data?.result?.role === "salesman") {
    //   navigation.navigate("Landing");
    // } else {
    //   navigation.navigate("Profile2");
    //   // navigation.navigate("landing");
    // }
  } catch (error) {
    //  console.log("error", error.response.data.message);
    Alert.alert(error.response.data.message);
    dispatch(
      updateuserFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const bannerDispatch = () => async (dispatch) => {
  try {
    dispatch(searchRequest());
    const { data } = await axiosInstance.get("home/banner", config);

    dispatch(searchSuccess(data));
  } catch (error) {
    dispatch(
      searchFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
// const demo = () => {

// }
export const categoryDispatch = () => async (dispatch) => {
  try {
    dispatch(categoryRequest());
    const { data } = await axios.get(
      "https://iconcomputer.in/api/category",
      config
    );
// console.log(data,'first')
    dispatch(categorySuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      categoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productcategoryDispatch = (id) => async (dispatch) => {
  try {
    dispatch(pcategoryRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/product/${id}`,
      config
    );

    dispatch(pcategorySuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      pcategoryFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productbarcodeDispatch = (id, navigation) => async (dispatch) => {
  // console.log(id,'barcode')
  try {
    //  console.log(id,'id')
    dispatch(pbarcodeRequest());
    const { data } = await axios.get(
      `${baseUrl}/productbarcode/${id}`,
      config
    );
//  console.log(data,'data')
    dispatch(pbarcodeSuccess(data));
     // console.log("data", data.data);
    if (data) {
      navigation.navigate("PRODUCT_QR__DETAILS", { item: data?.data });
    }
  } catch (error) {
      console.log("error", JSON.stringify(error));
       navigation.navigate("ProductQRDetailError");
      // navigation.navigate("Landing");
    dispatch(
      pbarcodeFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productsearchDispatch = (name) => async (dispatch) => {
  try {
    dispatch(psearchRequest());
    const { data } = await axios.get(
      `${baseUrl}/products/search?search=${name}`,
      config
    );

    dispatch(psearchSuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      psearchFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productDispatch = () => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axiosInstance.get("/product", config);

    dispatch(productSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      productFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const customerDispatch =
  (bodyData, cart, date, token) => async (dispatch) => {
    //  console.log(bodyData,'cart')

   // return
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch(customerRequest());
      const { data } = await axiosInstance.post("/order", bodyData, config);
      // console.log(data,'customer')

      //  console.log("data", data);
      // if (data?.status === 200) {
      //   let form = {
      //     customer_id: data?.result?.id,
      //     shipping_address: data?.result?.address,
      //     shipping_pin: data?.result?.pin,
      //     order_status: "pending",
      //     delivery_date: date.toISOString().split("T")[0],
      //   };
      // dispatch(orderDispatch(form, cart, token));
       dispatch( customerSuccess())
      // }
    } catch (error) {
        console.log("error", error);
      dispatch(
        customerFail(
    
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
export const orderDispatch = (bodyData, cart, token) => async (dispatch) => {
  // console.log(bodyData)
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(orderRequest());
    const { data } = await axiosInstance.post("/order", bodyData, config);

    dispatch(orderSuccess(data));
    if (data?.status === 200) {
      cart.forEach((item) => {
        // Prepare the form data for each item in the cart
        const form = {
          order_id: data?.result?.id,
          product_id: item.id, // Assuming each cart item has a product_id
          quantity: item.qnty, // Assuming each cart item has a quantity
          price: parseFloat(Number(item?.sale_price)),
          total: parseFloat(Number(item?.sale_price) * Number(item.qnty)),
        };

        // Dispatch the action for each form
        dispatch(orderDetailDispatch(form, cart));
      });
    }
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      orderFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const orderDetailDispatch = (bodyData) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axiosInstance.post("/orderdetail", bodyData, config);

    dispatch(orderDetailSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      orderDetailFail(
        //console.log(first)
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const updateProductDetailDispatch = (bodyData) => async (dispatch) => {
  try {
    dispatch(updateProductDetailRequest());
    const { data } = await axiosInstance.post(
      "/updateProductDetail",
      bodyData,
      config
    );

    dispatch(updateProductDetailSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      updateProductDetailFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const updateProductDispatch =
  (bodyData, navigation, token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch(updateProRequest());
      const { data } = await axiosInstance.post(
        "/updateProduct",
        bodyData,
        config
      );
      dispatch(updateProSuccess(data));
      dispatch(productDispatch());
      navigation.navigate("Productlist");

      //  console.log("res", data);
    } catch (error) {
      dispatch(
        updateProFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const productTopDispatch = () => async (dispatch) => {
  try {
    dispatch(productTopRequest());
    const { data } = await axiosInstance.get("/fetchTopCarousel", config);

    dispatch(productTopSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      productTopFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productBottomDispatch = () => async (dispatch) => {
  try {
    dispatch(productBottomRequest());
    const { data } = await axiosInstance.get("/fetchBottomCarousel", config);

    dispatch(productBottomSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      productBottomFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productHotDispatch = () => async (dispatch) => {
  try {
    dispatch(productHotRequest());
    const { data } = await axiosInstance.get("/fetchHotCarousel", config);
// console.log(data,'dat')
    dispatch(productHotSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      productHotFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const ordergetDispatch = (token, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(ordergetRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/order/${id}`,
      config
    );

    dispatch(ordergetSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      ordergetFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const orderProductDetailDispatch = (bodyData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(orderProductDetailRequest());
    const { data } = await axiosInstance.post("/orderdetail", bodyData, config);

    dispatch(orderProductDetailSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      orderProductDetailFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const salemanDispatch = (id,toke) => async (dispatch) => {
 
  try {
    dispatch(salesRequest());
    const { data } = await axios.get(
      `${baseUrl}/sales/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${toke}`,
        },
      }
    );
    AsyncStorage.setItem("sales", JSON.stringify(data));
    dispatch(salesSuccess(data));
    //  console.log("data", data);
    if (data) {
      // dispatch(salemanPointDispatch(data[0]?.id));
    }
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      salesFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const customerNewDispatch = (bodyData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(customerRequest());
    const { data } = await axiosInstance.post("/customer", bodyData, config);

    dispatch(customerSuccess(data));
    //  console.log("data", data);
    if (data?.status === 200) {
      Alert.alert("Customer Added Successfully");
    }
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      customerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const salemanpayDispatch = () => async (dispatch) => {
  try {
    dispatch(salespayRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/salespayment`,
      config
    );

    dispatch(salespaySuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      salespayFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const salemanPointDispatch = (token, id) => async (dispatch) => {
  // console.log(token, id,'oo')
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(salesPointRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/point/${id}`,
      config
    );
// console.log(data,'pint')
    dispatch(salesPointSuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      salesPointFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const showCustomerDispatch = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(showCustomerRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/customer`,
      config
    );

    dispatch(showCustomerSuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      showCustomerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const managerpayDispatch = () => async (dispatch) => {
  try {
    dispatch(managerpayRequest());
    const { data } = await axios.get(
      `https://iconcomputer.in/api/managerpayment`,
      config
    );

    dispatch(managerpaySuccess(data));
    //  console.log("data", data);
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      managerpayFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const productAllDispatch = () => async (dispatch) => {
  try {
    dispatch(productAllRequest());
    const { data } = await axiosInstance.get("/productAll", config);

    dispatch(productAllSuccess(data));
  } catch (error) {
    //  console.log("error", error);
    dispatch(
      productAllFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export default HomeReducer;
