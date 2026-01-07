import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    prepareHeaders: (headers) => {
        return headers;
    }
});

const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Posts'],
    keepUnusedDataFor: 60, //seconds
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], number | void>({
            query: (page = 1) => `/posts?_page=${page}&_limit=10`,
            providesTags: (result) =>
                result
                ? [...result.map(({ id })=>({ type: 'Posts' as const, id})),
                    {type: 'Posts', id: 'LIST'}
                ]
                : [{type: 'Posts', id: 'LIST'}],
                transformResponse: (response: Post[]) => response
        }),
        getPost: builder.query<Post, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{type: 'Posts', id}]
        }),
        deletePost: builder.mutation<{success: boolean; id:number}, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                {type: 'Posts', id},
                {type: 'Posts', id: 'LIST'}
            ]
        }),
        updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
            query: (id, ...patch) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: (result, error, { id }) => [
                {type: 'Posts', id}
            ]
        }),
        addPost: builder.mutation<Post, Partial<Post>>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body
            }),
            invalidatesTags : [{ type: 'Posts', id: 'LIST'}],
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                const patch = dispatch(
                    api.util.updateQueryData('getPosts', 1, (draft) => {
                        draft.unshift({
                            id: Math.floor(Math.random() * 1000000),
                            userId: arg.userId ?? 1,
                            title: arg.title ?? '(untitled)',
                            body: arg.body ?? ''
                        } as Post);
                    })
                );
                try{
                    await queryFulfilled;
                }
                catch(err){
                    patch.undo();
                    throw err;
                }
            }
        })
    })
});

export {api};
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
    useAddPostMutation,
    useLazyGetPostQuery
} = api;