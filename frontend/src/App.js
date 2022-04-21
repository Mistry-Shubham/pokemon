import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from './Contexts';
import HomeScreen from './screens/HomeScreen';
import './App.scss';

const App = () => {
	return (
		<ContextProvider>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
			</Routes>
		</ContextProvider>
	);
};

export default App;
