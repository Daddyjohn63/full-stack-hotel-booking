import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    updateProfile: builder.mutation({
      query(body) {
        //we will get 'body' from our component
        return {
          url: '/me/update',
          method: 'PUT',
          body
        };
      }
    }),
    updateSession: builder.query({
      query() {
        return {
          url: '/auth/session?update'
        };
      }
    })
  })
});

export const { useUpdateProfileMutation, useLazyUpdateSessionQuery } = userApi;
