import React, { useContext } from 'react';
import { IoMdCreate, IoIosClose } from 'react-icons/io';
import PostContext from '../context/index';
import '../App.css';

function Chat({ onChatItemHandler, chatItem }) {
  const { updatePost, deletePost } = useContext(PostContext);

  return (
    <>
      <li className="chat-item " onClick={() => onChatItemHandler(chatItem.id)}>
        {chatItem.title}
        <span className="edit-icon" onClick={updatePost}>
          <IoMdCreate />
        </span>
        <span className="delete-icon" onClick={deletePost}>
          <IoIosClose />
        </span>
      </li>
    </>
  );
}

export default Chat;
