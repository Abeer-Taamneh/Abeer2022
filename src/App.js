import React,{useState,useEffect} from 'react'
import { ToastContainer} from 'react-toastify';
import {Routes,Route} from 'react-router-dom'
import Navigation from './components/navigation';
import Brands from'./components/brands'
import Products from './components/products';
import Origin from './components/origins';
import Units from './components/units';
import { CategoriesAdminPage } from './components/categories';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import { getCurrentUser } from './service/userService';
import Profile from './components/profile'
import UsersStore from './components/usersStore';
import Home from './components/home';
const App = () => {
  const [user,setUser] = useState(null)
  // const [Admin,setAdmin]=useState({})
  useEffect(() => {
    update();
  }, [])

  async function  update(){
    const _user = await getCurrentUser();
    setUser(_user);
  }

  console.log('user',user);
  return (
   <div>
    <ToastContainer />
    <Navigation user={user}/>  
    <Routes>    
      <Route path='/brands' element={<Brands user={user} />}/>
      <Route path='/products' element = {<Products/>} />
      <Route path='/origins' element = {<Origin/>} />
      <Route path='/categories' element = {<CategoriesAdminPage allowEdit={true}/>} />
      <Route path='/register' element = {<Register  />} />
      <Route path='/units' element = {<Units/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/logout' element = {<Logout/>} />
      <Route path='/profile' element = {<Profile user={user}/>} />
      {user&&<Route path='/usersstore' element = {<UsersStore user={user}/>} />}   
      <Route path='/' element = {<Home  user={user}/>} /> 
    </Routes>
  </div>
  )
 
}

export default App

// <Route path='/brands' element={<Brands user={user} />}/>
// <Route path='/products' element = {<Products/>} />
// <Route path='/origins' element = {<Origin/>} />
// <Route path='/categories' element = {<CategoriesAdminPage allowEdit={true}/>} />
// <Route path='/register' element = {<Register  />} />
// <Route path='/units' element = {<Units/>} />
// <Route path='/login' element = {<Login/>} />
// <Route path='/logout' element = {<Logout/>} />
// <Route path='/profile' element = {<Profile user={user}/>} />
// <Route path='/UsersProductsService' element = {<UsersProductsService/>} />


// <ToastContainer />
// <Navigation user={user}/>  
// <Routes>    

