import { useState, useEffect } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [postList, setPostList] = useState({})

    const fetchData = async () => {
        let res = await axios.get("http://localhost:4000/posts")
        setPostList(res.data);

    }

    useEffect(() => fetchData(), []);

    const renderPosts = () => (
        Object.values(postList).map(post => (
            <div key={post.id} className="col-sm-4 mb-3">
                <div className="card">
                    <div className="card-body" >
                        <h3>{post.title}</h3>
                        <CommentCreate postId={post.id} />
                        <CommentList postId={post.id} />
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div className="row mt-5">{renderPosts()}</div>
    )
}

export default PostList;