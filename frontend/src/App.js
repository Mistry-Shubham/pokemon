import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import './App.scss';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeScreen />} />
		</Routes>
	);
};

export default App;
