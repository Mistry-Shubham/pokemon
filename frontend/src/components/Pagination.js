import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
	IoArrowBackSharp,
	IoArrowForwardSharp,
	IoCodeWorkingSharp,
} from 'react-icons/io5';
import './components.scss';

const Pagination = ({ onPageChange, pageCount }) => {
	return (
		<ReactPaginate
			previousLabel={<IoArrowBackSharp />}
			nextLabel={<IoArrowForwardSharp />}
			breakLabel={<IoCodeWorkingSharp />}
			pageCount={pageCount}
			marginPagesDisplayed={1}
			onPageChange={onPageChange}
			containerClassName="pagination-container"
			previousLinkClassName="previous-button"
			nextLinkClassName="next-button"
			activeClassName="page-active"
		/>
	);
};

export default Pagination;
