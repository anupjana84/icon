import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    productDetails: {},
  }
 const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    
    setProductDetails: (state, action) => {
      state.productDetails = action.payload
     // state.value += action.payload
    },
  },
})
const { actions } = productDetailsSlice

export const { setProductDetails} = actions

export default productDetailsSlice