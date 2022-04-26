import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { pokemonDataFetchReducer, pokemonDataReducer } from './reducers';

const reducer = combineReducers({
	pokemonDataFetch: pokemonDataFetchReducer,
	pokemonData: pokemonDataReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
