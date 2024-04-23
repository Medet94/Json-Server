import React, { useContext } from 'react';
import Message from '../components/Message';
import PostContext from '../context/PostContext';

function MessageList() {
  const { selectedPostMessages, selectedPostId, allChats } =
    useContext(PostContext);

  return (
    <>
      {allChats.map((post) =>
        post.id === selectedPostId ? <h3>{post.title}</h3> : ''
      )}

      <ul className="chat-list">
        {selectedPostMessages.map((message, id) => {
          return <Message message={message} key={id} />;
        })}
      </ul>
    </>
  );
}

export default MessageList;
