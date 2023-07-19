import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import Plans from './pages/plans/plans'


const CustomRoutes = () => {
  	return (
    	<div>
      		<Routes>
				<Route exact path='/' element={<Home />}/>
				<Route exact path='/Auth' element={<Auth />}/>
				<Route exact path='/Questions' element={<Home />}/>
				<Route exact path='/AskQuestion' element={<AskQuestion />}/>
				<Route exact path='/Questions/:id' element={<DisplayQuestion />}/>
				<Route exact path='/Tags' element={<Tags/>}/>
				<Route exact path='/Users' element={<Users/>}/>
				<Route exact path='/Users/:id' element={<UserProfile/>}/>
				<Route exact path='/Plans' element={<Plans/>}/>
      		</Routes>
    	</div>
  	)
}

export default CustomRoutes

