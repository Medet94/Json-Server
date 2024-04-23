import React, { useContext } from 'react';
import { IoMdCreate, IoIosClose } from 'react-icons/io';
import PostContext from '../context/PostContext';
import '../App.css';

function Chat({ chatItem, onChatItemHandler }) {
  const { deletePost, updatePost } = useContext(PostContext);

  return (
    <li className="chat-item " onClick={() => onChatItemHandler(chatItem.id)}>
      {chatItem.title}
      <span className="edit-icon" onClick={updatePost}>
        <IoMdCreate />
      </span>
      <span className="delete-icon" onClick={deletePost}>
        <IoIosClose />
      </span>
    </li>
  );
}

export default Chat;
