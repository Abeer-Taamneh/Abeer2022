import axios from "axios";
import {toast} from 'react-toastify'
import jwtDecode from 'jwt-decode';
import httpService from "./httpService";
const url = "http://147.182.183.104/";
export async function registerUser(user){
    
        try {
            const res = await axios.post(url+"api/users",user);            
            const jwt = res.headers['x-auth-token'];
            localStorage.setItem('token', jwt)
            window.location.href='/'
            toast(res.data);
            
        } catch (ex) {
            toast.error(ex.message);
        }
    
}
export async function loginUser(user){
    try {
        const res = await axios.post(url+"api/auth",user); 
        const jwt = res.data;
        // toast(res.data);   
        localStorage.setItem('token',jwt)
        window.location.href='/'
    
    } catch (ex) {;
        toast.error(ex.response.data);
    }
}
export  async function getCurrentUser(){
    let _user = null;
    try{
        const jwt =localStorage.getItem('token');
        if(jwt)
            _user=jwtDecode(jwt);
      }
      catch(ex){
        toast.error(ex.message);
      }
      //
    //   console.log('user',user);
      if(_user){
        const _allUsers =  await httpService._get('users');
        // console.log('_allUsers',_allUsers);
        return(_allUsers.find(u=>u.id == _user.id));
      }
    return null;
}
export  function logOut(){
    localStorage.removeItem('token');
    
}

export  function getToken(){
    return localStorage.getItem('token');
}
