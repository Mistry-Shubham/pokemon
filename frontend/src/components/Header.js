import { IoSearchSharp, IoChevronDownSharp } from 'react-icons/io5';

const Header = () => {
	return (
		<header>
			<img src="images/pokemon.png" alt="Pokemon" />
			<div className="search-box">
				<input type="text" />
				<IoSearchSharp className="search-icon" />
			</div>
			<div className="filters">
				<div>
					<p>Filter</p>
					<IoChevronDownSharp />
				</div>
				<div>
					<p>Sort</p>
					<IoChevronDownSharp />
				</div>
			</div>
		</header>
	);
};

export default Header;
