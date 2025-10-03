import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({ url, method, body: data, params, headers }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') ?? '{"token":null }');
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: { ...headers, authorization: `Bearer ${user?.token}` }
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message
      }
    };
  }
};

const baseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl }),
  reducerPath: 'baseApi',
  endpoints: () => ({})
});

export default baseApi;
