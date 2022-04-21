import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../actions';
import Contexts from '../Contexts';
import Card from '../components/Card';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import './screens.scss';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { renderData, setRenderData, setBackup } = useContext(Contexts);

	const [rawData, setRawData] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);

	const cardsPerPage = 60;
	const pagesVisited = pageNumber * cardsPerPage;
	const pageCount = Math.ceil(renderData.length / cardsPerPage);

	const pageChangeHandler = ({ selected }) => setPageNumber(selected);

	const { loading, pokemonData, error } = useSelector(
		(state) => state.pokemonDataFetch
	);

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
			<Header />
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
