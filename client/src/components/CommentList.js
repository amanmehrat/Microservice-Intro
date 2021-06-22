import { useState, useEffect } from "react";
import axios from 'axios';

const CommentList = ({ postId }) => {
    const [CommentList, setCommentList] = useState([])

    useEffect(async () => {
        let res = await axios.get(`http://localhost:4001/posts/${postId}/Comments`)
        setCommentList(res.data);
    }, []);

    const renderComments = () => (
        CommentList.map(Comment => (
            <li key={Comment.id} className="" >
                <h5>{Comment.content}</h5>
            </li>
        ))
    )

    return (
        <ul className="mt-2">{renderComments()}</ul>
    )
}

export default CommentList;