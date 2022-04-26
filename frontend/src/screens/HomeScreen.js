import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../actions';
import Contexts from '../Contexts';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import { POKEMON_DATA_RESET } from '../constants';
import './screens.scss';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { renderData, setRenderData, setBackup, setParams } =
		useContext(Contexts);

	const [rawData, setRawData] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);

	const cardsPerPage = 60;
	const pagesVisited = pageNumber * cardsPerPage;
	const pageCount = Math.ceil(renderData.length / cardsPerPage);

	const pageChangeHandler = ({ selected }) => setPageNumber(selected);

	const { loading, pokemonData, error } = useSelector(
		(state) => state.pokemonDataFetch
	);

	const { pokemonData: singlePokemonData } = useSelector(
		(state) => state.pokemonData
	);

	useEffect(() => {
		if (singlePokemonData.pokemon) {
			dispatch({ type: POKEMON_DATA_RESET });
		}
	}, [singlePokemonData]);

	useEffect(() => {
		setParams({ state: true, paramsId: null });
	}, []);

	useEffect(() => {
		dispatch(fetchApiData());
	}, [dispatch]);

	useEffect(() => {
		setRawData(pokemonData || []);
		setRenderData(pokemonData || []);
		setBackup(pokemonData || []);
	}, [pokemonData]);

	return (
		<>
			<Dropdown />
			<main className="main-container">
				<div className="home-screen">
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<div className="card-grid">
							{pokemonData &&
								renderData
									.slice(pagesVisited, pagesVisited + cardsPerPage)
									.map((pokemon, idx) => <Card key={idx} pokemon={pokemon} />)}
						</div>
					)}
				</div>
				<Pagination onPageChange={pageChangeHandler} pageCount={pageCount} />
			</main>
		</>
	);
};

export default HomeScreen;
