import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css';
import { Route, Redirect } from 'react-router-dom'
import Header from './component/Header/Header';
import Hero from './component/Hero/Hero';
import TableHome from './component/Table/TableHome';
import TableView from './component/Table/TableView'
import useExpressFetch from './hooks/useExpressFetch';
import { dataActions } from './store/index';

function App() {
	const { getExpressDdata, fetchData } = useExpressFetch()
	const dispath = useDispatch();
	dispath(dataActions.setNodeData(fetchData));

	useEffect(() => {
		getExpressDdata({ url: 'http://127.0.0.1:3000/api/v1/stocks/getstocks', btntype: 'delete', fetchType: 'node' })
	}, [getExpressDdata])

	return (
		<div className='App'>
			<Header />
			<Hero />
			<Route path='/' exact>
				<Redirect to='/home' />
			</Route>
			<Route path='/home'>
				<TableHome />
			</Route>
			<Route path='/view'>
				<TableView />
			</Route>
		</div>
	);
}

export default App;
