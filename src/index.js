import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>
    ,
    document.getElementById('root')
);