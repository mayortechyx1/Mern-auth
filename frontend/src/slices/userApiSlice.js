import { apiSlice } from "./apiSlice";

const userApiUrl = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${userApiUrl}/login`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${userApiUrl}/logout`,
        method: 'POST',
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${userApiUrl}`,
        method: 'POST',
        body: data
      })
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${userApiUrl}/profile`,
        method: 'PUT',
        body: data
      })
    }),
  })
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation} = userApiSlice;