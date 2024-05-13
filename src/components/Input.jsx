import React from 'react';
import { settext } from '../redux/slices/inputSlice';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';

const Input = () => {
  const textInput = useSelector((state) => state.text.text);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(settext(event.target.value));
  };

  return (
    <form>
      <input
        className="input-form"
        type="text"
        value={textInput}
        onChange={handleInputChange}
        placeholder="Введите сообщение..."
      />
    </form>
  );
};

export default Input;
