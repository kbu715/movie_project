import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App'; //.env에서 기본적으로 src폴더를 보게 해준다.
import './api';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
>
        <App/>
    </Provider>,

    
    document.getElementById('root')
  );
