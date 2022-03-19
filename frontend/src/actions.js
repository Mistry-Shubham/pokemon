import { API_DATA_REQUEST, API_DATA_SUCCESS, API_DATA_FAIL } from './constants';

export const fetchApiData = () => async (dispatch) => {
	try {
		dispatch({ type: API_DATA_REQUEST });

		const fetchData = await fetch(
			'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0.'
		);

		const parse = await fetchData.json();

		dispatch({ type: API_DATA_SUCCESS, payload: parse.results });
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
