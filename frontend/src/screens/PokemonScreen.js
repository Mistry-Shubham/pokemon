import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5';
import Chart from '../components/Chart';
import Evolution from '../components/Evolution';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchPokemonData } from '../actions';
import Contexts from '../Contexts';
import './screens.scss';

const PokemonScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: pokemonId } = useParams();

	const [position, setPosition] = useState(0);
	const [abilities, setAbilities] = useState([]);

	const { setParams } = useContext(Contexts);

	const { loading, pokemonData, error } = useSelector(
		(state) => state.pokemonData
	);

	useEffect(() => {
		dispatch(fetchPokemonData(pokemonId));

		if (pokemonId < 1) {
			navigate('/pokemon/898');
			setParams({ state: false, paramsId: 898 });
		} else if (pokemonId > 898) {
			navigate('/pokemon/1');
			setParams({ state: false, paramsId: 1 });
		} else {
			setParams({ state: false, paramsId: +pokemonId });
		}
		setAbilities([]);
	}, [pokemonId]);

	useEffect(() => {
		if (pokemonData && pokemonData.pokemon) {
			pokemonData.pokemon.abilities.forEach(async (ability) => {
				const fetchdata = await fetch(ability.ability.url);
				const { effect_entries } = await fetchdata.json();
				const para = effect_entries.filter(
					(entry) => entry.language.name === 'en'
				);
				setAbilities((prev) => [
					...prev,
					{ name: ability.ability.name, desc: para[0] || [] },
				]);
			});
		}
	}, [pokemonData]);

	return (
		<div className="main-container">
			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<>
					{pokemonData.pokemon && (
						<div className="pokemon-screen">
							<div className="grid">
								<div className="carousel">
									<div
										className="carousel-slide"
										style={{ transform: `translateX(${position}px)` }}
									>
										<img
											src={pokemonData.pokemon.sprites.front_default}
											alt={pokemonData.pokemon.name}
										/>
										<img
											src={pokemonData.pokemon.sprites.back_default}
											alt={pokemonData.pokemon.name}
										/>
									</div>
									<div className="navigator">
										<button type="button" onClick={() => setPosition(0)}>
											<IoArrowBackSharp />
										</button>
										<div
											className={position === 0 ? 'dot active' : 'dot'}
										></div>
										<div
											className={position === -300 ? 'dot active' : 'dot'}
										></div>
										<button type="button" onClick={() => setPosition(-300)}>
											<IoArrowForwardSharp />
										</button>
									</div>
								</div>
								<div className="details">
									<h3>{pokemonData.pokemon.name}</h3>
									{pokemonData.pokemon.types.map((item, idx) => (
										<img
											key={idx}
											className="type"
											title={
												item.type.name[0].toUpperCase() +
												item.type.name.substring(1)
											}
											alt={
												item.type.name[0].toUpperCase() +
												item.type.name.substring(1)
											}
											src={`/images/${item.type.name}.png`}
										/>
									))}

									<section>
										<p>Number - {pokemonData.species.id}</p>
										<p>Height - {pokemonData.pokemon.height}</p>
										<p>Weight - {pokemonData.pokemon.weight}</p>
										<p>Experience - {pokemonData.pokemon.base_experience}</p>
										<p>Capture Rate - {pokemonData.species.capture_rate}</p>
										<p>Happiness - {pokemonData.species.base_happiness}</p>
									</section>

									<div className="abilities">
										<h4>Abilities</h4>
										{abilities.map((ability, idx) => (
											<div key={idx}>
												<h5>
													{idx + 1}
													{') '}
													{ability.name}
												</h5>
												{ability.desc.effect && (
													<p>
														<b>Effect</b> - {ability.desc.effect}
													</p>
												)}
												{ability.desc.short_effect && (
													<p>
														<b>Short Effect</b> - {ability.desc.short_effect}
													</p>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="stats-moves">
								<div className="moves-container">
									<table>
										<thead>
											<tr>
												<th>Sr No</th>
												<th>Move</th>
											</tr>
										</thead>
										<tbody>
											{pokemonData.pokemon.moves.map((move, idx) => (
												<tr key={idx + 1}>
													<td>{idx + 1}</td>
													<td>{move.move.name}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<Chart
									data={{
										name: pokemonData.pokemon.name,
										stats: pokemonData.pokemon.stats,
									}}
								/>
							</div>
							<Evolution data={pokemonData.e_chain} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default PokemonScreen;
