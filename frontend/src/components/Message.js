import './components.scss';

const Message = ({ children }) => {
	return (
		<div id="error">
			<h4>
				<span>!</span> Error - {children}
			</h4>
		</div>
	);
};

export default Message;
