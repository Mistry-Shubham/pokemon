import { API_DATA_REQUEST, API_DATA_SUCCESS, API_DATA_FAIL } from './constants';

export const apiDataFetchReducer = (state = { apiData: [] }, action) => {
	switch (action.type) {
		case API_DATA_REQUEST:
			return { loading: true };
		case API_DATA_SUCCESS:
			return { loading: false, apiData: action.payload };
		case API_DATA_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
