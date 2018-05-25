import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin()
ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root'));
    registerServiceWorker();
