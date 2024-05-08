import React, { useState, useEffect } from 'react';
import LeftPanel from './pages/LeftPanel';
import MainPanel from './pages/MainPanel';
import { deleteMessageById, getCommentById } from './url';
import PostContext from './context/index';
import Input from './components/Input';
import Button from './components/Button';
import axios from 'axios';
import './App.css';
import { getPosts } from './redux/slices/postSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  //state;

  const [selectedPostMessages, setSelectedPostMessages] = useState([]);

  const [inputText, setInputText] = useState('');

  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const dispatch = useDispatch();

  //get all posts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //messages
  let commentClickHandler = async (commentId) => {
    let commentById;
    commentById = await fetch(`${getCommentById}${commentId}`);
    commentById = await commentById.json();
    setSelectedCommentId(commentId);
  };

  //input
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  //delete comment
  const deleteComment = async () => {
    if (window.confirm('Do you wanna delete this comment?')) {
      let commentId = selectedCommentId;
      try {
        await axios.delete(`${deleteMessageById}${commentId}`);
        const comments = selectedPostMessages.filter(
          (comment) => comment.id !== commentId
        );
        setSelectedPostMessages(comments);
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    }
  };

  //======================================
  return (
    <div className="app">
      <div className="main-panel">
        <PostContext.Provider
          value={{
            selectedPostMessages,
            handleInputChange,
            inputText,
            deleteComment,
            commentClickHandler,
          }}
        >
          <div className="list-panel">
            <LeftPanel />
          </div>
          <div className="message-panel">
            <MainPanel />
          </div>
          <div className="bottom-panel">
            <Input />
            <Button />
          </div>
        </PostContext.Provider>
      </div>
    </div>
  );
};

export default App;
