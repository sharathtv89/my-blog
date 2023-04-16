import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');    
    const [commentText, setCommentText] = useState('');

    const {user} = useAuth0();

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedby: user.email,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName("");
        setCommentText("");
    }

    return(
        <div id="add-comment-form">
            <h3>Add a comment</h3>
            <label>
                You are commenting as {user.email}                
                <br />
                <br />
            </label>            
            <label>
                Comment:
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;