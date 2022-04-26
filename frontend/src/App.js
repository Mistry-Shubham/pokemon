import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from './Contexts';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import PokemonScreen from './screens/PokemonScreen';
import './App.scss';

const App = () => {
	return (
		<ContextProvider>
			<Header />
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/pokemon/:id" element={<PokemonScreen />} />
			</Routes>
		</ContextProvider>
	);
};

export default App;
