import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuildReducer from './store/Reducers/burgerBuildReducer';
import orderReducer from './store/Reducers/orderReducer';
import authReducer from './store/Reducers/authReducer';
import thunk from  'redux-thunk';


const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose;
const rootReducer = combineReducers({
    burgerBuilder:burgerBuildReducer,
    orderState:orderReducer,
    auth:authReducer,
});
const store=createStore(rootReducer, composeEnhancers(
   applyMiddleware(thunk)
));

const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
