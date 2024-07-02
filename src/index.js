import React from 'react';
import ReactDOM from 'react-dom';
import './asset/styles/constants.css'
import App from './App';
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Store from './store/store';

ReactDOM.render(
    <React.StrictMode>
     <Provider store={Store}>
         <HashRouter>
           <App/>
         </HashRouter>
     </Provider>
    </React.StrictMode>
 ,document.getElementById('root'))