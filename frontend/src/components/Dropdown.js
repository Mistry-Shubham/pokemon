import { useState, useEffect, useContext } from 'react';

import Contexts from '../Contexts';

const Dropdown = () => {
	const [filterType, setFilterType] = useState([]);
	const [filterGen, setFilterGen] = useState([]);
	const [sortValue, setSortValue] = useState('');

	const {
		backup,
		setRenderData,
		toggle,
		setToggle,
		filter,
		setFilter,
		sort,
		setSort,
		setFilteredTypeData,
		setFilteredGenData,
	} = useContext(Contexts);

	const types = [
		'normal',
		'fighting',
		'flying',
		'poison',
		'ground',
		'rock',
		'bug',
		'ghost',
		'steel',
		'fire',
		'water',
		'grass',
		'electric',
		'psychic',
		'ice',
		'dragon',
		'dark',
		'fairy',
	];

	const genertions = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];

	const sorts = ['numerically', 'alphabetically'];

	useEffect(() => {
		if (filter.type.length === 0 && filterType.length > 0 && !toggle.filter) {
			setFilterType([]);
		}
		if (filter.gen.length === 0 && filterGen.length > 0 && !toggle.filter) {
			setFilterGen([]);
		}
	}, [filter, filterType, filterGen, toggle]);

	const filterpplyHandler = () => {
		setRenderData(backup);
		setFilteredTypeData([]);
		setFilteredGenData([]);
		setFilter({ type: filterType, gen: filterGen });
		setToggle({ sort: false, filter: false });
	};

	const filterClearHandler = () => {
		setRenderData(backup);
		setFilterType([]);
		setFilterGen([]);
		setFilter({ type: [], gen: [] });
		setToggle({ sort: false, filter: false });
	};

	const sortApplyHandler = () => {
		setSort(sortValue);
		setTimeout(() => {
			setToggle({ sort: false, filter: false });
		}, 50);
	};

	const sortClearHandler = () => {
		setSortValue('');
		setSort('A-numerically');
		setToggle({ sort: false, filter: false });
	};

	return (
		<>
			{(toggle.filter || toggle.sort) && (
				<div className="dropdown">
					{toggle.filter && (
						<div className="filter-menu">
							<fieldset>
								<legend>Type</legend>
								{types.map((type, idx) => (
									<span key={idx}>
										<input
											type="checkbox"
											name="type"
											id={type}
											defaultChecked={filter.type.includes(type)}
											value={type}
											onClick={(e) => {
												if (filterType.includes(e.target.value)) {
													setFilterType(
														filterType.filter(
															(repeat) => repeat !== e.target.value
														)
													);
												} else {
													setFilterType((prev) => [...prev, e.target.value]);
												}
											}}
										/>
										<label
											style={{ textTransform: 'capitalize' }}
											htmlFor={type}
										>
											{type}
										</label>
									</span>
								))}
							</fieldset>
							<fieldset>
								<legend>Generation</legend>
								{genertions.map((genertion, idx) => (
									<span key={idx + 20}>
										<input
											type="checkbox"
											name="generaton"
											id={genertion}
											defaultChecked={filter.gen.includes(genertion)}
											value={genertion}
											onClick={(e) => {
												if (filterGen.includes(e.target.value)) {
													setFilterGen(
														filterGen.filter(
															(repeat) => repeat !== e.target.value
														)
													);
												} else {
													setFilterGen((prev) => [...prev, e.target.value]);
												}
											}}
										/>
										<label
											style={{ textTransform: 'uppercase' }}
											htmlFor={genertion}
										>
											{genertion}
										</label>
									</span>
								))}
							</fieldset>
							<div className="buttons">
								<button
									type="button"
									className="apply"
									onClick={filterpplyHandler}
								>
									Apply
								</button>
								<button
									type="button"
									className="clear"
									onClick={filterClearHandler}
								>
									Clear
								</button>
							</div>
						</div>
					)}
					{toggle.sort && (
						<div className="sort-menu">
							<fieldset>
								<legend>Ascending</legend>
								{sorts.map((item, idx) => (
									<span key={idx + 40}>
										<input
											type="radio"
											name="sort"
											id={`A-${item}`}
											defaultChecked={sort === `A-${item}`}
											value={`A-${item}`}
											onClick={(e) => setSortValue(e.target.value)}
										/>
										<label
											style={{ textTransform: 'capitalize' }}
											htmlFor={`A-${item}`}
										>
											{item}
										</label>
									</span>
								))}
							</fieldset>
							<fieldset>
								<legend>Descending</legend>
								{sorts.map((item, idx) => (
									<span key={idx + 40}>
										<input
											type="radio"
											name="sort"
											id={`D-${item}`}
											defaultChecked={sort === `D-${item}`}
											value={`D-${item}`}
											onClick={(e) => setSortValue(e.target.value)}
										/>
										<label
											style={{ textTransform: 'capitalize' }}
											htmlFor={`D-${item}`}
										>
											{item}
										</label>
									</span>
								))}
							</fieldset>
							<div className="buttons">
								<button
									type="button"
									className="apply"
									onClick={sortApplyHandler}
								>
									Apply
								</button>
								<button
									type="button"
									className="clear"
									onClick={sortClearHandler}
								>
									Clear
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Dropdown;
