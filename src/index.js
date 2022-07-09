import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EnterToSite from './components/EnterToSite';
import Profile from './components/Profile';
import Peoples from './components/Peoples';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store = {store}>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/enter" element={<EnterToSite />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/peoples" element={<Peoples />} />
    </Routes>
    </BrowserRouter>
  </Provider>
);
