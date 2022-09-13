import React,{useState} from 'react'
import Button from '@mui/material/Button';
import MyTextField from './common/myTextField';
import { registerUser } from '../service/userService'
export default function Register(props) {
    const [userName,setUserName] = useState('');
  const [email,setEmail,] = useState('');
  const[password,setPassword]=useState('')
 
    return (
        <div>
          <MyTextField label ={'User Name'} placeholder = {'* UserName'} value ={userName} setValue ={setUserName}  />
          <MyTextField label ={'Email'} placeholder = {'* Email'} value ={email} setValue ={setEmail}  />
          <MyTextField  label ={'password'} placeholder = {'* password'} value ={password} setValue ={setPassword}  />
          <Button autoFocus color="inherit" 
            onClick= {()=>{
                const user = {name:userName,email:email,password:password}
                registerUser(user);
            }}
            >
            Entry
          </Button>
         
        </div>

    );
}


