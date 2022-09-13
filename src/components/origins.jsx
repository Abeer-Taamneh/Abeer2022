import React,{ useState ,useEffect} from 'react'
import originsService from '../service/originsService';
import OriginTable from './originTable';
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import IconButton from '@mui/material/IconButton';
import {AddCircleOutline} from '@mui/icons-material';
import OriginsDialog from './originsDialog';

export default function Origin() {
const [origins, setOrigins] = useState([]);
const[selectedOrigin, setSelectedOrigin]= useState(null);
const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
const [open, setOpen] = useState(false);
useEffect(()=>{
    update();
  }, []);

  
  async function update(){
    const _origins= await originsService._get();
    setOrigins(_origins);
    setSelectedOrigin(null);
  }
  
  return (
    <div>
       
    <OriginTable
        origins={origins}
        setOrigins={setOrigins}
       />
    
    </div>
  )
  }
