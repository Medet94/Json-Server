import React from 'react';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { ClockLoader } from 'react-spinners';

function MessageList() {
  const comments = useSelector((state) => state.comments.comments);

  const isLoading = useSelector((state) => state.comments.isLoading);

  return (
    <>
      {' '}
      {isLoading ? (
        <ClockLoader color="#5269ec" />
      ) : (
        <ul className="chat-list">
          {comments.map((message, id) => {
            return <Message message={message} key={id} />;
          })}
        </ul>
      )}
    </>
  );
}

export default MessageList;
