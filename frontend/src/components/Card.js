import './components.scss';

const Card = ({ pokemon }) => {
	return (
		<>
			<div className="pokemon-container">
				<div className={`type-background ${pokemon.types[0].type.name}`}>
					<h3>{pokemon.name}</h3>
					<img src={pokemon.sprites.front_default} alt={pokemon.name} />
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
									title={
										type.type.name[0].toUpperCase() +
										type.type.name.substring(1)
									}
									alt={
										type.type.name[0].toUpperCase() +
										type.type.name.substring(1)
									}
									src={`images/${type.type.name}.png`}
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
