import React from 'react';
import { RiChatDeleteLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/slices/commentsSlice';
import { getCommentId } from '../redux/slices/commentsSlice';
import { commentSelect } from '../redux/slices/idSlice';

function Message({ message }) {
  const commentId = useSelector((state) => state.id.commentId);

  const dispatch = useDispatch();

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const commentClickHandler = (commentId) => {
    dispatch(getCommentId(commentId));
    dispatch(commentSelect(commentId));
  };

  return (
    <>
      <h2 className="message" onClick={() => commentClickHandler(message.id)}>
        {message.text}

        <RiChatDeleteLine onClick={() => deleteCommentHandler(commentId)} />
      </h2>
    </>
  );
}

export default Message;
