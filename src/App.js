import React, { useState, useEffect } from 'react';
import LeftPanel from './pages/LeftPanel';
import MainPanel from './pages/MainPanel';
import { getCommentById } from './url';
import PostContext from './context/index';
import Input from './components/Input';
import Button from './components/Button';

import './App.css';
import { getPosts } from './redux/slices/postSlice';
import { useDispatch } from 'react-redux';
import { commentSelect } from './redux/slices/idSlice';

const App = () => {
  //state;
  const [inputText, setInputText] = useState('');

  const dispatch = useDispatch();

  //get all posts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let commentClickHandler = async (commentId) => {
    let commentById;
    commentById = await fetch(`${getCommentById}${commentId}`);
    commentById = await commentById.json();

    dispatch(commentSelect(commentId));
  };

  //input
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="app">
      <div className="main-panel">
        <PostContext.Provider
          value={{
            handleInputChange,
            inputText,
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
