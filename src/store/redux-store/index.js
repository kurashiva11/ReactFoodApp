import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';

const store = configureStore({
    reducer: { cartStore : cartSlice.reducer,  }
});

export default store;