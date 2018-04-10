import React from 'react';
import ReactDOM from 'react-dom';
import theme from './toolbox/theme'
import { ThemeProvider } from 'react-css-themr';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
