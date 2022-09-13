import React, { useState ,useEffect}  from 'react'
import unitsService from '../service/unitsService';
import {IconButton,Button,Dialog,AppBar,Toolbar,Typography} from "@mui/material";
import { Edit, Delete,AddCircleOutline,Close } from "@mui/icons-material";
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import MyTextField from './common/myTextField';

function UnitsDialog({open,setOpen,unit,onUpdate}) {
  const [nameen,setNameen] = useState(unit?unit.nameen:'');
  const [namear,setNamear,] = useState(unit?unit.namear:'');

  useEffect(()=>{
    if(!unit)return;
    setNameen(unit.nameen);
    setNamear(unit.namear);
   
  }, [unit]);

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
               unit.nameen = nameen;
               unit.namear = namear;
                await unitsService._save(unit);
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
      
        </div>
</Dialog>
)
}

//======================================================================================================
 function UnitsTable( {units,setUnits}) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
    

    <div>
        <IconButton aria-label="delete"  color="secondary" className='my-auto' 
                onClick={ ()=>{
                    setSelectedUnit({id:0,nameen:'',namear:''});
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
      </tr>



      
  {units&&units.map((unit) => (
    <tr key={unit.id}>
    <td>{unit.id}</td>
    <td>{unit.nameen}</td>
  <td>{unit.namear}</td>
      
      
    <td>
      <IconButton
     aria-label="delete"
         color="error"
        onClick={() => {
            setSelectedUnit(unit);
            setopenConfirmDelDlg(true)
          }}
        >
          <Delete />
        </IconButton>
      </td>
      <td>
      <IconButton color="primary" 
          onClick={()=>{
            setSelectedUnit(unit);
            setOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        </td>
    </tr>
  ))}
    </thead>
   
  </table>

    <UnitsDialog
      open={open}
      setOpen={setOpen}
     unit ={selectedUnit}
      onUpdate = {async ()=>{
        const __units= await unitsService._get();
        // setUnits(_units);
      }}
      
   />
  
  <ConfirmDeleteDialog 
      open={openConfirmDelDlg} 
      setopen={setopenConfirmDelDlg}
      text={`units ${selectedUnit&&selectedUnit.nameen}  will be deleted permenantly, are you sure?`} 
      onConfirm ={async()=>{
          if(!selectedUnit)return;
          await unitsService._delete(selectedUnit.id);
       }}
      /> 
    
    </div>
  )
}

 //=======================================================================================
 export default function Units() {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  useEffect(()=>{
      update();
    }, []);

    async function update(){
      const _units= await unitsService._get();
      setSelectedUnit(null);
      console.log(_units);
      setUnits(_units);
    }
    
return (
  <div>
  <UnitsTable units = {units} setUnits={setUnits}/>
  </div>
)
}
 
    
    
 
  
