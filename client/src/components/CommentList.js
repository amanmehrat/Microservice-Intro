import { useState, useEffect } from "react";
import axios from 'axios';

const CommentList = ({ postId, commentList }) => {

    const renderComments = () => (
        commentList.map(Comment => (
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