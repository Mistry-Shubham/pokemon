import { useState, createContext, useEffect } from 'react';

const Contexts = createContext();

export const ContextProvider = ({ children }) => {
	const [backup, setBackup] = useState([]);
	const [renderData, setRenderData] = useState([]);
	const [filter, setFilter] = useState({ type: [], gen: [] });
	const [filteredTypeData, setFilteredTypeData] = useState([]);
	const [filteredGenData, setFilteredGenData] = useState([]);
	const [sort, setSort] = useState('A-numerically');
	const [serach, setSearch] = useState('');
	const [toggle, setToggle] = useState({ sort: false, filter: false });

	const gendata = {
		i: [1, 151],
		ii: [152, 251],
		iii: [252, 386],
		iv: [387, 493],
		v: [494, 649],
		vi: [650, 721],
		vii: [722, 809],
		viii: [810, 898],
	};

	useEffect(() => {
		if (filter.gen.length > 0) {
			filter.gen.forEach((item) =>
				setFilteredGenData((prev) => [
					...prev,
					...renderData.filter((pokemon) => {
						if (
							pokemon.id >= gendata[`${item}`][0] &&
							pokemon.id <= gendata[`${item}`][1]
						) {
							return pokemon;
						}
					}),
				])
			);
		} else {
			setFilteredGenData(backup);
		}
	}, [filter]);

	useEffect(() => {
		if (filter.type.length > 0) {
			filter.type.forEach((item) =>
				setFilteredTypeData((prev) => [
					...prev,
					...filteredGenData.filter((pokemon) => {
						if (filteredTypeData.id !== pokemon.id) {
							return pokemon.types.includes(item);
						}
					}),
				])
			);
		} else {
			setFilteredTypeData(filteredGenData);
		}
	}, [filter, filteredGenData]);

	useEffect(() => {
		if (filter.type.length > 0) {
			setRenderData(
				filteredTypeData.filter(
					(v1, idx, arr) => arr.findIndex((v2) => v2.id === v1.id) === idx
				)
			);
		} else {
			setRenderData(filteredTypeData);
		}
	}, [filteredTypeData]);

	console.log(renderData);

	return (
		<Contexts.Provider
			value={{
				backup,
				setBackup,
				renderData,
				setRenderData,
				filter,
				setFilter,
				sort,
				setSort,
				serach,
				setSearch,
				toggle,
				setToggle,
				setFilteredTypeData,
				setFilteredGenData,
			}}
		>
			{children}
		</Contexts.Provider>
	);
};

export default Contexts;