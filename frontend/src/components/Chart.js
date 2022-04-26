import { useEffect, useState, useContext } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Tooltip,
} from 'recharts';
import Contexts from '../Contexts';
import './components.scss';

const Chart = ({ data }) => {
	const [chartData, setChartData] = useState([]);
	const { name, stats } = data;

	const { windowDimensions } = useContext(Contexts);

	const { width } = windowDimensions;

	useEffect(() => {
		setChartData([
			{
				name: name[0].toUpperCase() + name.substring(1),
				health: stats[0].base_stat,
				attack: stats[1].base_stat,
				defense: stats[2].base_stat,
				's-attack': stats[3].base_stat,
				's-defense': stats[4].base_stat,
				speed: stats[5].base_stat,
			},
		]);
	}, [data]);

	return (
		<BarChart
			width={width - 600 > 800 ? 800 : width - 600 < 350 ? 350 : width - 600}
			height={300}
			data={chartData}
			barGap={20}
			barSize={'auto'}
			margin={{
				top: 20,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Legend />
			<Bar dataKey="health" fill="#66AF5B" />
			<Bar dataKey="attack" fill="#D9313E" />
			<Bar dataKey="defense" fill="#EA6B1C" />
			<Bar dataKey="s-attack" fill="#5B8CB7" />
			<Bar dataKey="s-defense" fill="#F398B5" />
			<Bar dataKey="speed" fill="#F3D165" />
		</BarChart>
	);
};

export default Chart;
