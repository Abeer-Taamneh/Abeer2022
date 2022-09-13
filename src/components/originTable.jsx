import React,{ useState ,useEffect} from 'react'
import IconButton from "@mui/material/IconButton";
import { Edit, Delete } from "@mui/icons-material";
import { AddCircleOutline } from "@mui/icons-material";
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import originsService from '../service/originsService';
import OriginsDialog from './originsDialog';
export default function OriginTable({ origins, setOrigins }) {
  const[selectedOrigin, setSelectedOrigin]= useState(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [open, setOpen] = useState(false);
 
  return (
    <div>
    <div>
    <IconButton aria-label="delete"  color="secondary" className='my-auto' 
        onClick={ ()=>{
            setSelectedOrigin({id:0,nameen:'',namear:''});
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
        </thead>
        {origins.map((origin) => (
          <tr key={origin.id}>
            <td>{origin.id}</td>
            <td>{origin.nameen}</td>
            <td>{origin.namear}</td>
            <td>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                setSelectedOrigin(origin);
                setopenConfirmDelDlg(true)
              }}
            >
              <Delete />
            </IconButton>
          </td>
          <td>
          <IconButton color="primary" 
              onClick={()=>{
                setSelectedOrigin(origin);
                setOpen(true);
              }}
            >
              <Edit />
            </IconButton>
            </td>
        </tr>
        ))}

      </table>
      <ConfirmDeleteDialog 
      open={openConfirmDelDlg} 
      setopen={setopenConfirmDelDlg}
      text={`prodect ${selectedOrigin&&selectedOrigin.nameen}  will be deleted permenantly, are you sure?`} 
      onConfirm ={async()=>{
          if(!selectedOrigin)return;
          await originsService._delete(selectedOrigin.id);
          
       }}
      /> 
      <OriginsDialog
      open={open}
      setOpen={setOpen}
     origin ={selectedOrigin}
      onUpdate = {async ()=>{
        const _origins= await originsService._get();
        setOrigins(_origins);
      }}
    />
    </div>
  );
}
