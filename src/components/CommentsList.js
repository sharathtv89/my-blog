const CommentsList = ({ comments }) => (
    <>
    <h3>Comments:</h3>
    {
        comments.map(comment => (
            <div className="comment" key={comment.postedby + ':' + comment.text }>
                <h4>{comment.postedby}</h4>
                <p>{comment.text}</p>
            </div>
        ))
    }
    </>
);

export default CommentsList;