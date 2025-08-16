import React, { useState } from 'react';
import Chat from '../components/Chat';
import { IoIosAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { createANewPost } from '../redux/slices/postSlice';
import { BeatLoader } from 'react-spinners';
import { RedoOutlined } from '@ant-design/icons';
import { getPosts } from '../redux/slices/postSlice';
import { getAllComments } from '../redux/slices/commentsSlice';
import { select } from '../redux/slices/idSlice';
import { Menu } from 'antd';
import '../App.css';

function ChatList() {
  const [title, setTitle] = useState('');

  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const dispatch = useDispatch();

  const createNewPost = (title) => {
    dispatch(createANewPost(title));
    setTitle('');
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePageUpdate = () => {
    dispatch(getPosts());
  };

  const chatClickHandler = (postId) => {
    dispatch(getAllComments(postId));
    dispatch(select(postId));
  };

  return (
    <>
      <div className="chat-list-container">
        <h3>
          Update Chat List
          <RedoOutlined onClick={handlePageUpdate} />
        </h3>

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
      </div>

      <IoIosAdd onClick={() => createNewPost(title)} />

      <ul className="chat-list">
        {posts.map((post) => (
          <>
            <Menu onClick={() => chatClickHandler(post.id)} items={posts} />
            <Chat chatItem={post} key={post.id} />
          </>
        ))}
      </ul>
    </>
  );
}

export default ChatList;
