import React, { useContext } from 'react';
import PostContext from '../context/index';
import '../App.css';
//import { useDispatch } from 'react-redux';

const Input = () => {
  const { handleInputChange } = useContext(PostContext);

  return (
    <form>
      <input
        className="input-form"
        type="text"
        onChange={handleInputChange}
        placeholder="Введите сообщение..."
      />
    </form>
  );
};

export default Input;
