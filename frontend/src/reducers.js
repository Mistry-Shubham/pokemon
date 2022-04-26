import {
	API_DATA_REQUEST,
	API_DATA_SUCCESS,
	API_DATA_FAIL,
	POKEMON_DATA_REQUEST,
	POKEMON_DATA_SUCCESS,
	POKEMON_DATA_FAIL,
	POKEMON_DATA_RESET,
} from './constants';

export const pokemonDataFetchReducer = (
	state = { pokemonData: [] },
	action
) => {
	switch (action.type) {
		case API_DATA_REQUEST:
			return { loading: true };
		case API_DATA_SUCCESS:
			return { loading: false, pokemonData: action.payload };
		case API_DATA_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const pokemonDataReducer = (state = { pokemonData: {} }, action) => {
	switch (action.type) {
		case POKEMON_DATA_REQUEST:
			return { loading: true };
		case POKEMON_DATA_SUCCESS:
			return { loading: false, pokemonData: action.payload };
		case POKEMON_DATA_FAIL:
			return { loading: false, error: action.payload };
		case POKEMON_DATA_RESET:
			return { pokemonData: {} };
		default:
			return state;
	}
};
