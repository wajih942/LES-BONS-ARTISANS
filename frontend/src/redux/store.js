import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from '../services/auth';
import baseApi from '../services/api/base';
import {initSocketListeners} from '../services/socket/socketListener'
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)

  // devTools: import.meta.env.PROD
});

setupListeners(store.dispatch);
initSocketListeners(store);
