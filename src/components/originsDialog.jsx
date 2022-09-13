import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MyTextField from './common/myTextField';
import originsService from '../service/originsService';

// import { Transition } from '@mui/material/transitions';
export default function OriginsDialog({open,setOpen,onUpdate,origin}) {
  const [nameen,setNameen] = useState(origin?origin.nameen:'');
  const [namear,setNamear,] = useState(origin?origin.namear:'');


  useEffect(()=>{
    if(!origin)return;
    setNameen(origin.nameen);
    setNamear(origin.namear);
  }, [origin]);

  return (
   
  <Dialog
    fullScreen
    open={open}
  >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={()=>setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          </Typography>
          <Button autoFocus color="inherit" 
            onClick= {async ()=>{
                setOpen(false);
                origin.nameen = nameen;
                origin.namear = namear;
                console.log('origin',origin);
                // setOrigin(origin);
                await originsService._save(origin);
                onUpdate()}    
          }
            >
            save
          </Button>
        </Toolbar>
        </AppBar>
        
        <div>
          <MyTextField label ={'Name EN'} placeholder = {'* Name EN'} value ={nameen} setValue ={setNameen}  />
          <MyTextField label ={'Name AR'} placeholder = {'* Name AR'} value ={namear} setValue ={setNamear}  />
          </div>
</Dialog>
  )
}


// <List>
//   <TextField 
//   label="Nameen" 
//   variant="filled" 
//   color="success" 
//   focused 
//   className='m-2' 
//   placeholder='الاسم بالانجليزيه'
//   onChange={(e)=>{
//     const updatedBrand = {...selectedBrand};
//     updatedBrand.nameen = e.target.value;
//     setSelectedBrand(updatedBrand);
//   }}
//   value={selectedBrand?selectedBrand.nameen:''}
//   />
// <br/>
// <TextField
//   label="namear"
//   variant="filled"
//   color="success"
//   focused  
//   className='m-2' 
//   placeholder='الاسم بالعربي'
//   onChange={(e)=>{
//     const updatedBrand = {...selectedBrand};
//     updatedBrand.namear = e.target.value;
//     setSelectedBrand(updatedBrand);
//  }}
//  value={selectedBrand?selectedBrand.namear:''}
//  />
// <br/>
// <TextField
//   label="logo"
//   variant="filled"
//   color="success"
//   focused  
//   className='m-2' 
//   placeholder='logo'
//   onChange={(e)=>{
//     const updatedBrand = {...selectedBrand};
//     updatedBrand.logo = e.target.value;
//     setSelectedBrand(updatedBrand);
//   }}
//   value={selectedBrand?selectedBrand.logo:''}
// />
// <br/>
// <TextField
//   label="	descriptionen"
//   variant="filled"
//   color="success"
//   focused  
//   className='m-2' 
//   placeholder='	descriptionen'
//   onChange={(e)=>{
//     const updatedBrand = {...selectedBrand};
//     updatedBrand.descriptionen = e.target.value;
//     setSelectedBrand(updatedBrand);
//  }}
//  value={selectedBrand?selectedBrand.descriptionen:''}
// />
// <br/>
// <TextField
//   label="		descriptionar"
//   variant="filled"
//   color="success"
//   focused  
//   className='m-2' 
//   placeholder='		descriptionar'
//  onChange={(e)=>{
//   const updatedBrand = {...selectedBrand};
//     updatedBrand.descriptionar = e.target.value;
//     setSelectedBrand(updatedBrand);
//   }}
//   value={selectedBrand?selectedBrand.descriptionar:''}
// />
//  </List>