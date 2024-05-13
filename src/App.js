import React, { useEffect } from 'react';
import LeftPanel from './pages/LeftPanel';
import MainPanel from './pages/MainPanel';
import Input from './components/Input';
import Button from './components/Button';
import './App.css';
import { getPosts } from './redux/slices/postSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  //get all posts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="app">
      <div className="left-panel">
        <LeftPanel />
      </div>
      <div className="message-panel">
        <MainPanel />
      </div>
      <div className="bottom-panel">
        <Input />
        <Button />
      </div>
    </div>
  );
};

export default App;
