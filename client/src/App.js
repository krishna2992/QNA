import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import CustomRoutes from './CustomRoutes';
import { useEffect } from 'react';
import { fetchQuestions } from './actions/question';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from './actions/users';
import getAllplans from './actions/plans';



function App() {

	const dispatch = useDispatch()
	useEffect(() =>{
		dispatch(fetchQuestions())
		dispatch(fetchAllUsers())
		dispatch(getAllplans())
	}, [dispatch])
	
  	return (
    	<div className="App">
			<Router>
				<Navbar/>	
				<CustomRoutes />
			</Router>
    	</div>
  );
}

export default App;
