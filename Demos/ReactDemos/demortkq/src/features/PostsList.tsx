import { useState } from "react";
import { useGetPostsQuery } from "./api/apiSlice";
import { PostDetail } from './PostDetail';
import { AddPostForm } from './AddPostForm';

function PostsList(){
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isFetching, refetch } = useGetPostsQuery(page,{
        pollingInterval: 0
    });
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fe 1fr', gap: 24 }}>
                <div>
                    <h2>Posts (page {page})</h2>
                    <hr/>
                    <div style={{marginBottom: 12}}>
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled = {page === 1}>
                            Prev
                        </button>
                        <button onClick={() => setPage((p) =>  p + 1)} 
                            style = {{marginLeft: 8 }}>
                            Next
                        </button>
                        <button onClick={() => refetch()} style = {{marginLeft: 8 }}>
                            Refetch
                        </button>
                    </div>
                    {
                        isLoading && (
                            <p>
                                Loading...
                            </p>
                        )
                    }
                    {
                        error && (
                            <p style={{color: 'red'}}>
                                Error Loading Posts.
                            </p>
                        )
                    }
                    {
                        isFetching && !isLoading && (
                            <p>Updating...</p>
                        )
                    }
                    <ul>
                        {
                            data?.map((post) => (
                                <li key = {post.id}>
                                    <strong>{post.title}</strong>
                                    <p style={{marginTop: 4}}>
                                        {post.body}
                                        <PostDetail id={post.id} />
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <AddPostForm />
                </div>
            </div>
        </>
    );
}
export { PostsList };