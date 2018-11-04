import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
