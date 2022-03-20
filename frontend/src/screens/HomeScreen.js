import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../actions';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './screens.scss';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const [apiData, setApiData] = useState([]);
	const [pokemonData, setPokemonData] = useState([]);

	const {
		loading,
		apiData: dataApi,
		error,
	} = useSelector((state) => state.apiDataFetch);

	useEffect(() => {
		if (dataApi && dataApi.length > 0) {
			setApiData(dataApi);
			if (apiData.length > 0) {
				apiData.forEach((api) => {
					fetch(api.url)
						.then((response) => response.json())
						.then((result) => {
							setPokemonData((old) => [...old, result]);
						});
				});
			}
		} else {
			dispatch(fetchApiData());
		}
	}, [dispatch, dataApi]);

	return (
		<>
			<div className="main-container">
				<div className="home-screen">
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<div className="card-grid">
							{pokemonData.map((pokemon, idx) => (
								<Card key={idx} pokemon={pokemon} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default HomeScreen;
