import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../redux/slices/postSlice';
import { getAllComments } from '../redux/slices/commentsSlice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { select } from '../redux/slices/idSlice';
import '../App.css';

function Chat({ chatItem }) {
  const postId = useSelector((state) => state.id.postId);

  const dispatch = useDispatch();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const updatePostHandler = (postId) => {
    dispatch(updatePost(postId));
  };

  const chatClickHandler = (postId) => {
    dispatch(getAllComments(postId));
    dispatch(select(postId));
  };

  return (
    <>
      <li className="chat-item " onClick={() => chatClickHandler(chatItem.id)}>
        {chatItem.label}

        <span className="edit-icon" onClick={() => updatePostHandler(postId)}>
          <EditOutlined />
        </span>
        <span className="delete-icon" onClick={() => deletePostHandler(postId)}>
          <DeleteOutlined />
        </span>
      </li>
    </>
  );
}

export default Chat;
