import React, { useContext } from 'react';
import { RiChatDeleteLine } from 'react-icons/ri';
import PostContext from '../context/index';
import { useDispatch, useSelector } from 'react-redux';

function Message({ message }) {
  const { deleteComment, commentClickHandler } = useContext(PostContext);

  const commentsId = useSelector((state) => state.id.commentId);
  const dispatch = useDispatch();

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
