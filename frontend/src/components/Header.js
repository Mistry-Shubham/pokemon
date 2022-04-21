import { useContext } from 'react';
import { IoSearchSharp, IoChevronDownSharp } from 'react-icons/io5';
import Contexts from '../Contexts';

const Header = () => {
	const { toggle, setToggle, search, setSearch } = useContext(Contexts);

	return (
		<header>
			<img src="images/pokemon.png" alt="Pokemon" />
			<div className="search-box">
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<IoSearchSharp className="search-icon" />
			</div>
			<div className="filters">
				<div onClick={() => setToggle({ filter: !toggle.filter, sort: false })}>
					<p>Filter</p>
					<IoChevronDownSharp />
				</div>
				<div onClick={() => setToggle({ filter: false, sort: !toggle.sort })}>
					<p>Sort</p>
					<IoChevronDownSharp />
				</div>
			</div>
		</header>
	);
};

export default Header;
