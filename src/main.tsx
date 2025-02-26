import React from 'react';
import ReactDOM from 'react-dom/client';
import GitProfile from './components/gitprofile';
import config from '../gitprofile.config';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GitProfile config={config} />
  </React.StrictMode>
);
