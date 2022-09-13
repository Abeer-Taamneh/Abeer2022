import React,{useState,useEffect} from 'react';
import { getCategories ,deleteCategorios, deleteCategory} from '../services/categoriesService';
import { TreeView,TreeItem } from '@mui/lab';
import {ExpandMore,ChevronRight} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';
import {Delete,AddCircleOutline} from '@mui/icons-material';
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import CategoriesDialog from './categoriesDialog';
import {Edit} from '@mui/icons-material';
export function CategoriesTreeView({user}) {
   const [allCategories, setallCategories] = useState([]);
   const [baseCategories,setbaseCategories]=useState([]);
   const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
   const [selectedCategory, setselectedCategory] = useState(null);
   const [open, setOpen] = useState(false);
 
  

   useEffect(() => {
    update();
   
   }, [] );
   useEffect(()=>{
        setbaseCategories(allCategories.filter(c=>c.parentid == 0));
   },[allCategories])

  async function update(){
    const _allCategories = await getCategories();
    _allCategories.forEach(category => {
        category.subcategories = _allCategories.filter(c=>c.parentid == category.id)
    });     
    setallCategories(_allCategories);
  }
  
  function renderCategoryLabel(category){
    return(
        <div> 
            <img src={category.logo} style={{width:50,height:50 }}/>
            <span className='text-primary mx-2'>{category.id}</span>
            {category.nameen}
            {user&&user.isAdmin&&<IconButton 
                color="error"
                disabled = {category.subcategories.length>0} 
                onClick={ async ()=>{
                    setselectedCategory(category);
                    setopenConfirmDelDlg(true);
                    
                    // console.log(`category ${category.nameen} will be deleted`);
                }}
            >
                <Delete/>
            </IconButton>}

            {user&&user.isAdmin&& <IconButton 
                    color="primary"
                    onClick={ ()=>{
                        setselectedCategory({parentid:category.id,nameen:'',namear:'',logo:'',descriptionen:'',descriptionar:''});
                        setOpen(true)
                    }}
                >
                <AddCircleOutline/>
            </IconButton>}


            {user&&user.isAdmin&&<IconButton color="primary"
            aria-label="add to shopping cart"
            onClick={ ()=>{
                setselectedCategory(category);
                setOpen(true)
            }}
          >
            <Edit />
          </IconButton>}
        </div>
    )
  } 
  function renderCategory(category){
    return(
        <TreeItem
            nodeId={category.id.toString()}
            key={category.id}
            label={renderCategoryLabel(category)}
        >
        {category.subcategories.map(sc=>renderCategory(sc))}
        </TreeItem>
    )
  }

    return (
        <div>
            <div>
            {user&&user.isAdmin&& <IconButton 
                    color="primary"
                    onClick={()=>{
                        setselectedCategory({parentid:0,nameen:'',namear:'',logo:'',descriptionen:'',descriptionar:''});
                        setOpen(true)
                    }}
                >
                    <AddCircleOutline/>
                </IconButton> }         
            </div>

            <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                
            >
                {baseCategories.map(bc=>renderCategory(bc))}
            </TreeView>

            {openConfirmDelDlg&&
                <ConfirmDeleteDialog 
                  open={openConfirmDelDlg} 
                  setopen={setopenConfirmDelDlg}
                  text={`Category ${selectedCategory.nameen}  will be deleted permenantly, are you sure?`} 
                  onConfirm ={async()=>{
                    // console.log('selectedCategory',selectedCategory);
                    await deleteCategory(selectedCategory.id);
                    update();
                }}
               /> }
            {
            open&&<CategoriesDialog 
                open={open} 
                setOpen ={setOpen}
                category ={selectedCategory}   
                onSave={()=>{
                    update();
                }}/>
            }
        </div>
    )
}

