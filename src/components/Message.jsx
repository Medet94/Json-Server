import React, { useContext } from 'react';
import { RiChatDeleteLine } from 'react-icons/ri';
import PostContext from '../context/PostContext';

function Message({ message }) {
  const { deleteComment, commentClickHandler } = useContext(PostContext);
  return (
    <h2 className="message" onClick={() => commentClickHandler(message.id)}>
      {message.text}
      <span onClick={deleteComment}>
        <RiChatDeleteLine />
      </span>
    </h2>
  );
}

export default Message;
