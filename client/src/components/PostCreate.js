import { useState } from "react";
import axios from 'axios';
const PostCreate = () => {
    const [title, setTitle] = useState("")

    const savePost = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:4000/posts", { title });
        setTitle("");
    }

    return (
        <form onSubmit={savePost}>
            <h1>Add Post</h1>
            <div className="form-group">
                <label>Post Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-success mt-2">Submit</button>
        </form>
    )
}

export default PostCreate;