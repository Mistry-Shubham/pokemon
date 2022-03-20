import './components.scss';

const Card = ({ pokemon }) => {
	return (
		<>
			<div className="pokemon-container">
				<div className={`type-background ${pokemon.types[0]}`}>
					<h3>{pokemon.name}</h3>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
						alt={pokemon.name}
					/>
					<section>
						<p>Height - {pokemon.height}</p>
						<p>Weight - {pokemon.weight}</p>
						<p>Exp - {pokemon.base_experience}</p>
						<p>
							Type{' - '}
							{pokemon.types.map((type, idx) => (
								<img
									key={idx}
									className="type"
									title={type[0].toUpperCase() + type.substring(1)}
									alt={type[0].toUpperCase() + type.substring(1)}
									src={`images/${type}.png`}
								/>
							))}
						</p>
					</section>
				</div>
			</div>
		</>
	);
};

export default Card;
