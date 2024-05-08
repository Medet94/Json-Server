import React, { useContext } from 'react';
import { RiChatDeleteLine } from 'react-icons/ri';
import PostContext from '../context/index';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/slices/commentsSlice';

function Message({ message }) {
  const { commentClickHandler } = useContext(PostContext);

  const commentsId = useSelector((state) => state.id.commentId);
  //console.log('Comments Id ', commentsId);

  const dispatch = useDispatch();

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <h2 className="message" onClick={() => commentClickHandler(message.id)}>
      {message.text}
      <span onClick={() => deleteCommentHandler(commentsId)}>
        <RiChatDeleteLine />
      </span>
    </h2>
  );
}

export default Message;
