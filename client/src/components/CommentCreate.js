import { useState } from "react";
import axios from 'axios';
const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState("")

    const saveComment = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/Comments`, { content });
        setContent("");
    }

    return (
        <form onSubmit={saveComment}>
            <div className="form-group">
                <input value={content} placeholder="comment" onChange={(e) => setContent(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-warning mt-2">Add Comment</button>
        </form>
    )
}

export default CommentCreate;