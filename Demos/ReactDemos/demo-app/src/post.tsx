function Post(){
    return(
        <>
            <div className="post">
                <h1>My First Blog Post</h1>
                <div>Author: Mark Twain</div>
                <div>Published: {new Date().toLocaleTimeString()}</div>
                <p>
                I am new to blogging and this is my first post. You should expect a
                lot of great things from me.
                </p>
            </div>
        </>
    );
}

export {Post};