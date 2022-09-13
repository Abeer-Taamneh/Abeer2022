import React,{useState} from 'react'
import Button from '@mui/material/Button';
import MyTextField from './common/myTextField';
import { loginUser } from '../service/userService';
export default function Login(props)  {
    const [userName,setUserName] = useState('');
  const[password,setPassword]=useState('')
 
    return (
        <div>
        <MyTextField label ={'User Name'} placeholder = {'* UserName'} value ={userName} setValue ={setUserName}  />
        <MyTextField label ={'password'} placeholder = {'* password'} value ={password} setValue ={setPassword} type='password' />

        <Button autoFocus color="inherit" 
        onClick= {()=>{
            const user = {name:userName,password:password}
            loginUser(user);
        }}
        >
        save
      </Button>
        </div>
    );
}

