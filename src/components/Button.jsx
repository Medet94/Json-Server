import React, { useContext } from 'react';
import { Button as PrimaryButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/slices/commentsSlice';
import PostContext from '../context';

function Button() {
  const dispatch = useDispatch();

  const selectId = useSelector((state) => state.id.postId);
  console.log('selected post id', selectId);

  const { inputText } = useContext(PostContext);
  console.log(inputText);

  const handleSendClick = ({ inputText, selectId }) => {
    dispatch(sendMessage({ inputText, selectId }));
  };

  return (
    <div>
      <PrimaryButton
        type="primary"
        className="send-btn send-icon"
        onClick={() => handleSendClick({ inputText, selectId })}
      >
        Send
      </PrimaryButton>
    </div>
  );
}

export default Button;
