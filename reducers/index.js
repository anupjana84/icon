import HomeReducer from "./HomeReducer";
import UiReducer from "./UiReducer";
import ProductDetails from "./ProductDetails";
const rootReducer = {
  home: HomeReducer.reducer,
  ui: UiReducer.reducer,
  productDetails: ProductDetails.reducer,
};

export default rootReducer;
