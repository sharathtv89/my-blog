import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import ArticlesList from "../components/ArticlesList";
import articles from './article-content'
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import NotFoundPage from "./NotFoundPage";
import LoginButton from "../components/Login";
import { useAuth0 } from "@auth0/auth0-react";

const ArticlePage = () => {
    const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] })     
    const { articleId } = useParams();

    const { user } = useAuth0();

    useEffect(() => {
        const loadArticleInfo = async () => {
        const response = await axios.get(`/api/articles/${articleId}`);
        const dbArticleInfo = response.data;
        setArticleInfo(dbArticleInfo);
        }

        loadArticleInfo();
    }, []);

    
    const article = articles.find(article => article.name === articleId);
    const otherArticles = articles.filter(article => article.name != articleId)

    const addUpvote = async () =>{
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if(!article){
        return <NotFoundPage />
    }

    return(
        <>
        <h1>{article.title}</h1>
        <div className="upvote-section">
            {user ?
            <button onClick={addUpvote}>Upvote</button>
            : <LoginButton buttonText={ "Login to upvote" } />}
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => 
            <p key={i}>{paragraph}</p>
        )}
        {user ?
        <AddCommentForm articleName={articleId}
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        : <LoginButton buttonText={ "Login to add comment" } />}
        <CommentsList comments={articleInfo.comments} />
        <h2>Other Articles</h2>
        <ArticlesList articles={otherArticles} />
        </>
    )
}

export default ArticlePage;