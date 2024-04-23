import React, { useContext } from 'react';
import Chat from '../components/Chat';
import PostContext from '../context/PostContext';
import { IoIosAdd } from 'react-icons/io';
import { MdDoneOutline } from 'react-icons/md';

function ChatList() {
  const {
    allChats,
    chatClickHandler,
    createNewPostClick,
    handleChatListInputChange,
  } = useContext(PostContext);

  return (
    <div className="chat-list-container">
      <h1>ChatList</h1>
      <input
        className="chat-list-input"
        type="text"
        placeholder="Создать новый пост"
        onChange={handleChatListInputChange}
      />

      <span className="icon-add" onClick={createNewPostClick}>
        <IoIosAdd />
      </span>

      <ul className="chat-list">
        {allChats.map((post) => (
          <Chat
            onChatItemHandler={chatClickHandler}
            chatItem={post}
            key={post.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
