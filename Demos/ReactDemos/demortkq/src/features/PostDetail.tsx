import { useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } from "./api/apiSlice";

interface PostDetailProps{
    id: number
}

function PostDetail({ id }: PostDetailProps){
    const { data:post, isLoading, isError } = useGetPostQuery(id);
    const [updatePost, { isLoading: isUpdating}] = useUpdatePostMutation();
    const [deletePost, { isLoading: isDeleting}] = useDeletePostMutation();

    if(isLoading){
        return (
            <>
                <p>
                    Loading Post #{id}...
                </p>
            </>
        );
    }

    if(isError || !post){
        return(
            <>
                <p style={{ color: 'red'}}>
                    Failed to load post #{id}
                </p>
            </>
        );
    }

    return (
        <>
            <div style = {{ borderTop: '1px solid #ddd', paddingTop: 8, marginTop: 8 }}>
                <button disabled = { isUpdating } onClick={() => 
                    updatePost({id, title: `${post.title} (edited)`})}>
                    { 
                        isUpdating ? 'Updating...' : 'Quick Edit Title'
                    }
                </button>
                <button disabled = { isDeleting } onClick={() => deletePost(id)} 
                    style = {{ marginLeft: 8, color: 'red'}}>
                    { 
                        isDeleting ? 'Deleting...' : 'Delete'
                    }
                </button>
            </div>
        </>
    );
}
export { PostDetail };