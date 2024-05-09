import React, { useContext, useState } from 'react';
import Chat from '../components/Chat';
import PostContext from '../context/index';
import { IoIosAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { createANewPost } from '../redux/slices/postSlice';
import { BeatLoader } from 'react-spinners';
import { RedoOutlined } from '@ant-design/icons';
import { getPosts } from '../redux/slices/postSlice';

function ChatList() {
  const [title, setTitle] = useState('');
  const { chatClickHandler } = useContext(PostContext);

  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const dispatch = useDispatch();

  const createNewPostClick = (title) => {
    dispatch(createANewPost(title));
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePageUpdate = () => {
    dispatch(getPosts());
  };

  return (
    <div className="chat-list-container">
      <span>
        Update Chat List
        <RedoOutlined onClick={handlePageUpdate} className="update-icon" />
      </span>

      <h1>ChatList</h1>
      {isLoading ? (
        <BeatLoader />
      ) : (
        <input
          className="chat-list-input"
          type="text"
          placeholder="Создать новый пост"
          onChange={handleTitle}
        />
      )}

      <span className="icon-add" onClick={() => createNewPostClick(title)}>
        <IoIosAdd />
      </span>

      <ul className="chat-list">
        {posts.map((post) => (
          <Chat
            onChatItemHandler={chatClickHandler}
            chatItem={post}
            key={post.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
