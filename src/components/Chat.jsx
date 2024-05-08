import React, { useState } from 'react';
import { IoMdCreate, IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../redux/slices/postSlice';
import { getAllComments } from '../redux/slices/commentsSlice';
import { select } from '../redux/slices/idSlice';
import '../App.css';

function Chat({ chatItem }) {
  const [updateTitle, setUpdateTitle] = useState('');
  const postId = useSelector((state) => state.id.postId);

  const dispatch = useDispatch();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const updatePostHandler = ({ updateTitle, postId }) => {
    dispatch(updatePost({ updateTitle, postId }));
  };

  const inputTitleText = (e) => {
    setUpdateTitle(e.target.value);
  };

  const chatClickHandler = (postId) => {
    dispatch(getAllComments(postId));
    dispatch(select(postId));
  };

  return (
    <>
      <input type="text" placeholder="new title" onChange={inputTitleText} />
      <li className="chat-item " onClick={() => chatClickHandler(chatItem.id)}>
        {chatItem.title}

        <span
          className="edit-icon"
          onClick={() => updatePostHandler({ updateTitle, postId })}
        >
          <IoMdCreate />
        </span>
        <span className="delete-icon" onClick={() => deletePostHandler(postId)}>
          <IoIosClose />
        </span>
      </li>
    </>
  );
}

export default Chat;
