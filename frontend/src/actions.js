import {
	API_DATA_REQUEST,
	API_DATA_SUCCESS,
	API_DATA_FAIL,
	POKEMON_DATA_REQUEST,
	POKEMON_DATA_SUCCESS,
	POKEMON_DATA_FAIL,
} from './constants';

export const fetchApiData = () => async (dispatch) => {
	try {
		dispatch({ type: API_DATA_REQUEST });

		const fetchData = await fetch('/api/data');

		const parse = await fetchData.json();

		dispatch({ type: API_DATA_SUCCESS, payload: parse });
	} catch (err) {
		dispatch({
			type: API_DATA_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const fetchPokemonData = (id) => async (dispatch) => {
	try {
		dispatch({ type: POKEMON_DATA_REQUEST });

		const data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const data2 = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${id}`
		);
		const parse1 = await data1.json();
		const parse2 = await data2.json();
		const data3 = await fetch(parse2.evolution_chain.url);
		const parse3 = await data3.json();

		dispatch({
			type: POKEMON_DATA_SUCCESS,
			payload: { pokemon: parse1, species: parse2, e_chain: parse3.chain },
		});
	} catch (err) {
		dispatch({
			type: POKEMON_DATA_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
