
const CommentList = ({ postId, commentList }) => {

    const renderComments = () => (
        commentList.map(Comment => {
            if (Comment.status == "Pending") {
                return <li key={Comment.id} className="">
                    <h5>This comment is awaiting scrutinity</h5>
                </li>
            } else if (Comment.status == "Rejected") {
                return <li key={Comment.id} className="">
                    <h5>This comment is Rejected</h5>
                </li>
            } else {
                return <li key={Comment.id} className="">
                    <h5>{Comment.content}</h5>
                </li>
            }
        })
    )

    return (
        <ul className="mt-2">{renderComments()}</ul>
    )
}

export default CommentList;