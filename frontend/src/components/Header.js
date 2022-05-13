import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	IoSearchSharp,
	IoChevronDownSharp,
	IoArrowBackSharp,
	IoArrowForwardSharp,
} from 'react-icons/io5';
import Contexts from '../Contexts';
import './components.scss';

const Header = () => {
	const navigate = useNavigate();

	const { toggle, setToggle, search, setSearch, params } = useContext(Contexts);

	return (
		<header>
			<img
				src="/images/pokemon.png"
				alt="Pokemon"
				onClick={() => {
					navigate('/');
					setToggle({ sort: false, filter: false });
				}}
			/>
			{params.state ? (
				<>
					<div
						className="search-box"
						onClick={() => setToggle({ sort: false, filter: false })}
					>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value.toLowerCase())}
						/>
						<IoSearchSharp className="search-icon" />
					</div>
					<div className="filters">
						<div
							onClick={() => setToggle({ filter: !toggle.filter, sort: false })}
						>
							<p>Filter</p>
							<IoChevronDownSharp />
						</div>
						<div
							onClick={() => setToggle({ filter: false, sort: !toggle.sort })}
						>
							<p>Sort</p>
							<IoChevronDownSharp />
						</div>
					</div>
				</>
			) : (
				<div className="buttons">
					<button
						type="button"
						title="Previous Pokemon"
						onClick={() => navigate(`/pokemon/${params.paramsId - 1}`)}
					>
						<IoArrowBackSharp />
					</button>
					<button
						type="button"
						title="Next Pokemon"
						onClick={() => navigate(`/pokemon/${params.paramsId + 1}`)}
					>
						<IoArrowForwardSharp />
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
