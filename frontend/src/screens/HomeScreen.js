import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../actions';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './screens.scss';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const [rawData, setRawData] = useState([]);

	const { loading, pokemonData, error } = useSelector(
		(state) => state.pokemonDataFetch
	);

	useEffect(() => {
		dispatch(fetchApiData());
	}, [dispatch]);

	useEffect(() => {
		setRawData(pokemonData || []);
	}, [pokemonData]);

	return (
		<>
			<header>
				<img src="images/pokemon.png" alt="" />
			</header>
			<main className="main-container">
				<div className="home-screen">
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<div className="card-grid">
							{pokemonData &&
								pokemonData.map((pokemon, idx) => (
									<Card key={idx} pokemon={pokemon} />
								))}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default HomeScreen;
