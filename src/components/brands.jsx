import React, { useState ,useEffect} from 'react'
import brandsService from '../service/brandsService';

import {IconButton,Button,Dialog,AppBar,Toolbar,Typography} from "@mui/material";
import { Edit, Delete,AddCircleOutline,Close } from "@mui/icons-material";
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import MyTextField from './common/myTextField';
//==================================================================================
function BrandsDialog({open,setOpen,brand,onUpdate}) {
  const [nameen,setNameen] = useState(brand?brand.nameen:'');
  const [namear,setNamear,] = useState(brand?brand.namear:'');
  const [logo,setLogo,] = useState(brand?brand.logo:'');
  const [descriptionen,setdescriptionen]=useState(brand?brand.descriptionen:'');
  const [descriptionar,setdescriptionar,] = useState(brand?brand.descriptionar:'');

  useEffect(()=>{
    if(!brand)return;
    setNameen(brand.nameen);
    setNamear(brand.namear);
    setLogo(brand.logo);
    setdescriptionen(brand.descriptionen);
    setdescriptionar(brand.descriptionar);
  }, [brand]);

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
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          </Typography>
          <Button autoFocus color="inherit" 
            onClick= {async()=>{
                setOpen(false);
                brand.nameen = nameen;
                brand.namear = namear;
                brand.logo=logo;
                brand.descriptionen=descriptionen;
                brand.descriptionar=descriptionar;
                await brandsService._save(brand);
                onUpdate();
              }    
          }
            >
            save
          </Button>
        </Toolbar>
        </AppBar>
        
        <div>
          <MyTextField label ={'Name EN'} placeholder = {'* Name EN'} value ={nameen} setValue ={setNameen}  />
          <MyTextField label ={'Name AR'} placeholder = {'* Name AR'} value ={namear} setValue ={setNamear}  />
          <MyTextField label ={'logo'} placeholder = {'* logo'} value ={logo} setValue ={setLogo}  />
          <MyTextField label ={' descriptionen '} placeholder = {'* descriptionen'} value ={descriptionen} setValue ={setdescriptionen} rows={4} multiline />
          <MyTextField label ={' descriptionar '} placeholder = {'* descriptionar'} value ={descriptionar} setValue ={setdescriptionar} rows={4} multiline/>
        </div>
</Dialog>
)
}

//==================================================================================
function BandsTable({ brands,setBrands }) {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [open, setOpen] = useState(false);
  
  return (
    <div>
    <div>
        <IconButton aria-label="delete"  color="secondary" className='my-auto' 
                onClick={ ()=>{
                    setSelectedBrand({id:0,nameen:'',namear:'',descriptionen:'',descriptionar:'',logo:''});
                    setOpen(true);
                }}
            >
            <AddCircleOutline />
            </IconButton>
        </div>

    <table className="table">
    <thead>
      <tr>
        <th>id</th>
        <th>nameen</th>
        <th>namear</th>
        <th>descriptionar</th>
        <th>descriptionen</th>
        <th>logo</th>
      </tr>
    </thead>
    {brands&&brands.map((brand) => (
      <tr key={brand.id}>
        <td>{brand.id}</td>
        <td>{brand.nameen}</td>
        <td>{brand.namear}</td>
        <td>{brand.descriptionar}</td>
        <td>{brand.descriptionen}</td>
        <td>  <img src={brand.logo}  alt='url' width={100} ></img></td>
       
        
        <td>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => {
              setSelectedBrand(brand);
              setopenConfirmDelDlg(true)
            }}
          >
            <Delete />
          </IconButton>
        </td>
        <td>
        <IconButton color="primary" 
            onClick={()=>{
              setSelectedBrand(brand);
              setOpen(true);
            }}
          >
            <Edit />
          </IconButton>
          </td>
      </tr>
    ))}
  </table>
    <BrandsDialog
      open={open}
      setOpen={setOpen}
      brand ={selectedBrand}
      onUpdate = {async ()=>{
        const _brands= await brandsService._get();
        setBrands(_brands);
      }}
      
   />
  
  <ConfirmDeleteDialog 
      open={openConfirmDelDlg} 
      setopen={setopenConfirmDelDlg}
      text={`brands ${selectedBrand&&selectedBrand.nameen}  will be deleted permenantly, are you sure?`} 
      onConfirm ={async()=>{
          if(!selectedBrand)return;
          await brandsService._delete(selectedBrand.id);
       }}
      /> 
    
    </div>
  )
}

//==================================================================================
export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    useEffect(()=>{
        update();
      }, []);

      async function update(){
        const _brands= await brandsService._get();
        setSelectedBrand(null);
        setBrands(_brands);
      }
      
  return (
    <div>
      <BandsTable
          brands={brands}
          setBrands = {setBrands}
      />
    </div>
  )
}
