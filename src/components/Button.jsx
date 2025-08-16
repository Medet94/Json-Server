import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/slices/commentsSlice';
import '../App.css';

function Button() {
  const dispatch = useDispatch();

  const selectId = useSelector((state) => state.id.postId);
  const inputText = useSelector((state) => state.text.text);

  const handleSendClick = ({ inputText, selectId }) => {
    dispatch(sendMessage({ inputText, selectId }));
  };

  return (
    <div>
      <button
        className="send-btn"
        onClick={() => handleSendClick({ inputText, selectId })}
      >
        Send
      </button>
    </div>
  );
}

export default Button;
