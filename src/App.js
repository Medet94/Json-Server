import React, { useState, useEffect } from 'react';
import LeftPanel from './pages/LeftPanel';
import MainPanel from './pages/MainPanel';
import {
  getAllPosts,
  getCommentsByPostId,
  createNewCommentByPostId,
  deleteMessageById,
  createNewPost,
  deletePostById,
  updatePostById,
  getCommentById,
} from './url';
import PostContext from './context/index';
import Input from './components/Input';
import Button from './components/Button';
import axios from 'axios';
import './App.css';

const App = () => {
  //state;
  const [allChats, setAllChats] = useState([]);

  const [selectedPostMessages, setSelectedPostMessages] = useState([]);

  const [inputText, setInputText] = useState('');

  const [selectedPostId, setSelectedPostId] = useState(null);

  const [chatListInpit, setChatListInput] = useState('');

  const [selectedCommentId, setSelectedCommentId] = useState(null);

  //get all posts
  useEffect(() => {
    async function getResponse() {
      let result = await fetch(getAllPosts);
      return await result.json();
    }

    getResponse()
      .then((posts) => {
        setAllChats(posts);
      })
      .catch((error) => console.error(error));
  }, []);

  //messages
  let chatClickHandler = async (postId) => {
    let allCommentsByPostId;
    allCommentsByPostId = await fetch(`${getCommentsByPostId}${postId}`);
    allCommentsByPostId = await allCommentsByPostId.json();
    setSelectedPostId(postId);

    return setSelectedPostMessages(allCommentsByPostId);
  };

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
  // chatList input
  const handleChatListInputChange = (event) => {
    setChatListInput(event.target.value);
  };

  //send message to server
  const handleSendClick = async () => {
    if (inputText.length > 0) {
      try {
        const response = await axios.post(createNewCommentByPostId, {
          text: inputText,
          postId: selectedPostId,
        });
        setSelectedPostMessages([...selectedPostMessages, response.data]);
        setAllChats([...allChats]);
        setInputText('');
      } catch (err) {
        console.error('Ошибка при отправке комментария:', err);
      }
    }
  };

  //create a new post
  const createNewPostClick = async () => {
    if (chatListInpit.length > 0) {
      try {
        const response = await axios.post(createNewPost, {
          title: chatListInpit,
          views: Math.random() * 100,
        });

        setAllChats([...allChats, response.data]);
        setChatListInput('');
      } catch (err) {
        console.error('Ошибка при отправке комментария:', err);
      }
    }
  };

  //update post
  const updatePost = async () => {
    if (chatListInpit.length > 0) {
      const postId = selectedPostId;

      try {
        const response = await axios.patch(`${updatePostById}${postId}`, {
          title: chatListInpit,
        });
        const updatedPosts = allChats.map((post) =>
          post.id === postId ? { ...post, title: response.data.title } : post
        );
        setAllChats(updatedPosts);
      } catch (error) {
        console.error('Ошибка при обновлении поста:', error);
      }
    }
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

  //delete post
  const deletePost = async () => {
    if (window.confirm(`Do you wanna delete the post : ${selectedPostId}?`)) {
      console.log('Post deleted');
      const postId = selectedPostId;
      try {
        await axios
          .delete(`${deletePostById}${postId}`)
          .then((response) => setAllChats(response.data));

        const posts = allChats.filter((post) => post.id !== postId);
        setAllChats(posts);
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
            allChats,
            chatListInpit,
            chatClickHandler,
            selectedPostMessages,
            handleInputChange,
            handleSendClick,
            createNewPostClick,
            handleChatListInputChange,
            deleteComment,
            deletePost,
            selectedPostId,
            updatePost,
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
