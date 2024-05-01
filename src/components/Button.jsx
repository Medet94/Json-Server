import React, { useContext } from 'react';

import PostContext from '../context/index';
import { IoMdSend } from 'react-icons/io';

function Button() {
  const { handleSendClick } = useContext(PostContext);
  return (
    <div>
      <button className="send-btn send-icon" onClick={handleSendClick}>
        <IoMdSend />
      </button>
    </div>
  );
}

export default Button;
