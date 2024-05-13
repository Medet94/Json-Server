import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/slices/commentsSlice';
import PostContext from '../context';

function Button() {
  const dispatch = useDispatch();

  const selectId = useSelector((state) => state.id.postId);

  const { inputText } = useContext(PostContext);

  const handleSendClick = ({ inputText, selectId }) => {
    dispatch(sendMessage({ inputText, selectId }));
  };

  return (
    <div>
      <button onClick={() => handleSendClick({ inputText, selectId })}>
        Send
      </button>
    </div>
  );
}

export default Button;
