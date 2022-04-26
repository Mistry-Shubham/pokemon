import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronForwardSharp, IoChevronDownSharp } from 'react-icons/io5';
import Contexts from '../Contexts';
import './components.scss';

const Evolution = ({ data }) => {
	const navigate = useNavigate();

	const [evolutionDetails, setEvolutionDetails] = useState({});

	const { windowDimensions } = useContext(Contexts);

	const step1 = +data.species.url.split('/')[6];
	const step2 =
		data.evolves_to.map((item) => +item.species.url.split('/')[6]) || [];
	const step3 =
		data.evolves_to.map((item1) =>
			item1.evolves_to.map((item2) => +item2.species.url.split('/')[6])
		)[0] || [];

	useEffect(async () => {
		const fetch1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${step1}`);
		const form1Data = () => {
			if (step2.length > 0) {
				return step2.map((step) =>
					fetch(`https://pokeapi.co/api/v2/pokemon/${step}`)
						.then((response) => response.json())
						.then((data) => {
							return data;
						})
				);
			}
		};

		const form2Data = () => {
			if (step3.length > 0) {
				return step3.map((step) =>
					fetch(`https://pokeapi.co/api/v2/pokemon/${step}`)
						.then((response) => response.json())
						.then((data) => {
							return data;
						})
				);
			}
		};
		let data1 = await fetch1.json();
		let data2 = [];
		let data3 = [];
		if (step2.length > 0) {
			data2 = (await Promise.all(form1Data())) || [];
		}
		if (step3.length > 0) {
			data3 = (await Promise.all(form2Data())) || [];
		}

		setEvolutionDetails({ data1, data2, data3 });
	}, []);

	const { data1, data2, data3 } = evolutionDetails;
	const { width } = windowDimensions;

	const navigateHandler = (id) => {
		navigate(`/pokemon/${id}`);
	};

	return (
		<div className="evolution-container">
			{data1 && (
				<div className="form">
					<div onClick={() => navigateHandler(data1.id)}>
						<div className="round-container">
							<img src={data1.sprites.front_default} alt={data1.name} />
						</div>
						<h4>
							{data1.name} {`#${data1.id}`}
						</h4>
					</div>
				</div>
			)}
			{data2 &&
				data2.length > 0 &&
				(width < 850 ? (
					<IoChevronDownSharp className="icon" />
				) : (
					<IoChevronForwardSharp className="icon" />
				))}
			{data2 && data2.length > 0 && (
				<div className={data2.length > 4 ? 'form form_2' : 'form'}>
					{data2.map((data) => (
						<div key={data.id} onClick={() => navigateHandler(data.id)}>
							<div className="round-container">
								<img src={data.sprites.front_default} alt={data.name} />
							</div>
							<h4>
								{data.name} {`#${data.id}`}
							</h4>
						</div>
					))}
				</div>
			)}
			{data3 &&
				data3.length > 0 &&
				(width < 850 ? (
					<IoChevronDownSharp className="icon" />
				) : (
					<IoChevronForwardSharp className="icon" />
				))}
			{data3 && data3.length > 0 && (
				<div className={data3.length > 4 ? 'form form_2' : 'form'}>
					{data3.map((data) => (
						<div key={data.id} onClick={() => navigateHandler(data.id)}>
							<div className="round-container">
								<img src={data.sprites.front_default} alt={data.name} />
							</div>
							<h4>
								{data.name} {`#${data.id}`}
							</h4>
						</div>
					))}
				</div>
			)}
			{data2 && data3 && data2.length < 1 && data3.length < 1 ? (
				<h4 className="label">No Evolution</h4>
			) : (
				<h4 className="label">Evolutions</h4>
			)}
		</div>
	);
};

export default Evolution;
