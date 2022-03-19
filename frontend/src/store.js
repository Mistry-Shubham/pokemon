import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { apiDataFetchReducer } from './reducers';

const reducer = combineReducers({
	apiDataFetch: apiDataFetchReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
