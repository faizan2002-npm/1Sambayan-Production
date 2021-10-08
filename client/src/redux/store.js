import {createStore,applyMiddleware,combineReducers} from 'redux';
const thunkMiddleware =require('redux-thunk').default;

const mainReducer=combineReducers({});

const store=createStore(mainReducer,applyMiddleware(thunkMiddleware));

export default store;