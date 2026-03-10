import React from 'react'
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
        </Route>
      </Routes>
     
    </div>
  )
}

export default App