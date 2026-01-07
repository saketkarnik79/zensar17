import { useState } from "react";
import { useAddPostMutation } from "./api/apiSlice";
import { type SyntheticEvent } from "react";

function AddPostForm(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [ addPost, { isLoading, isSuccess, isError, error} ] = useAddPostMutation();

    const onSubmit= async (event: SyntheticEvent) => {
        event.preventDefault();
        if(!title.trim()) {
            return;
        }

        await addPost({ title, body, userId: 1 });
        //console.log(error);

        setTitle('');
        setBody('');
    };

    return(
        <>
            <form onSubmit={onSubmit}>
                <h3>
                    Add New Post
                </h3>
                <hr/>
                <div>
                    <label>
                        Post Title
                    </label>
                    <input type="text" value={title} placeholder="Post Title"
                        onChange={(event) => setTitle(event.target.value) } />
                </div>
                <div>
                    <label>
                        Post Body
                    </label>
                    <textarea value={body} placeholder="Post Body"
                        onChange={(event) => setBody(event.target.value) }>

                    </textarea>
                </div>
                <div>
                    <button type="submit" disabled={isLoading}>
                        {
                            isLoading ? 'Adding...' : 'Add' 
                        }
                    </button>
                </div>
                {
                    isSuccess && (
                        <p style={{color: 'green'}}>
                            Post Added!
                        </p>
                    )
                }
                {
                     isError && (
                        <p style={{color: 'red'}}>
                            Error: {(error as Error).message}
                        </p>
                    )
                }
            </form>
        </>
    );
}
export { AddPostForm };