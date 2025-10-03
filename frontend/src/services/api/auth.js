/* eslint-disable camelcase */

import authSlice from '../auth';
import baseApi from './base';


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: `/api/auth/login`,
        method: 'POST',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(authSlice.actions.saveCredentials({ signInResponse: response.data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: `/api/auth/register`,
        method: 'POST',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(authSlice.actions.saveCredentials({ signInResponse: response.data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
  })
});

export default authApi;
