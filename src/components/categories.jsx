import React,{useState,useEffect} from 'react';
import { TreeView,TreeItem } from '@mui/lab';
import {ExpandMore,ChevronRight} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';
import {Delete,AddCircleOutline} from '@mui/icons-material';
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import categoriesService from '../service/categoriesService';
import {Edit} from '@mui/icons-material';
import MyTextField from"./common/myTextField"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
//=============================================================================================
function CategoriesDialog({open,setOpen,onSave,category}) {
    const [nameen,setNameen] = useState(category?category.nameen:'');
    const [namear,setNamear,] = useState(category?category.namear:'');
    const [logo,setLogo,] = useState(category?category.logo:'');
    const[descriptionen,setdescriptionen]=useState(category?category.descriptionen:'');
    const [descriptionar,setdescriptionar,] = useState(category?category.descriptionar:'');
    const [parentid,setparentid] = useState(category?category.parentid:0);
    
    const[publishednameen,setPublishednameen]=useState(category?category.publishednameen:'');
    const[publishednamear,setPublishednamear]=useState(category?category.publishednamear:'');
    const[categorytype,setCategorytype]=useState(category?category.categorytype:'');
    useEffect(()=>{
      if(!category)return;
      setparentid(category.parentid)
      setNameen(category.nameen);
      setNamear(category.namear);
      setLogo(category.logo);
      setdescriptionen(category.descriptionen);
      setdescriptionar(category.descriptionar);
      setPublishednameen(category.publishednameen);
      setPublishednamear(category.publishednamear);
      setCategorytype(category.categorytype);
    }, [category]);
  
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
                  category.parentid = parentid;
                  category.nameen = nameen;
                  category.namear = namear;
                  category.logo=logo;
                  category.descriptionen=descriptionen;
                  category.descriptionar=descriptionar;
                  category.publishednameen=publishednameen;
                  category.publishednamear=publishednamear;
                  category.categorytype=categorytype;
                  await categoriesService._save(category); 
                  onSave()}    
            }
              >
              save
            </Button>
          </Toolbar>
          </AppBar>
          
          <div>
            <MyTextField label ={'Parent Id'}  value ={parentid} setValue={setparentid} type = 'number'  />
            <MyTextField label ={'Type'}  value ={categorytype} setValue={setCategorytype} type = 'number'  />
            <MyTextField label ={'Name EN'} placeholder = {'* Name EN'} value ={nameen} setValue ={setNameen}  />
            <MyTextField label ={'Name AR'} placeholder = {'* Name AR'} value ={namear} setValue ={setNamear}  />
            <MyTextField label ={'publishednamear'} placeholder = {'* publishednamear'} value ={publishednamear} setValue ={setPublishednamear}  />
            <MyTextField label ={'publishednameen'} placeholder = {'* publishednameen'} value ={publishednameen} setValue ={setPublishednameen}  />
            <MyTextField label ={'logo'} placeholder = {'* logo'} value ={logo} setValue ={setLogo}  />
            <MyTextField label ={' descriptionen '} placeholder = {'* descriptionen'} value ={descriptionen} setValue ={setdescriptionen} rows={4} multiline />
            <MyTextField label ={' descriptionar '} placeholder = {'* descriptionar'} value ={descriptionar} setValue ={setdescriptionar} rows={4} multiline/>
          </div>
  </Dialog>
    )
  }
  
//=============================================================================================
export function CategoriesTreeView({allowEdit,onSelect,categories}) {
   const [allCategories, setallCategories] = useState([categories]);
   const [baseCategories,setbaseCategories]=useState([]);
   const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
   const [selectedCategory, setselectedCategory] = useState(null);
   const [open, setOpen] = useState(false);

   useEffect(() => {
    // update();
    const _allCategories = categories; 
    if(!categories)return;
    _allCategories.forEach(category => {
        category.subcategories = _allCategories.filter(c=>c.parentid == category.id)
    });     
    setallCategories(_allCategories);
    setbaseCategories(_allCategories.filter(c=>c.parentid == 0));

   
   }, [categories] );

//    async function update(){
//     const _allCategories = await categoriesService._get();
//     _allCategories.forEach(category => {
//         category.subcategories = _allCategories.filter(c=>c.parentid == category.id)
//     });     
//     setallCategories(_allCategories);
//     setbaseCategories(_allCategories.filter(c=>c.parentid == 0));
//   }
  
  function renderCategoryLabel(category){
    const class_name = (category.categorytype ==1)? 'row bg-secondary':'row';
    

    return(
        <div className={class_name}>
            <div className='col'> 
            <img src={category.logo} style={{width:50,height:50 }}/>
            <span className='text-primary mx-2'>{category.id}</span>
            <span className=' mx-2'>{category.nameen}</span>
            <span className='text-secondary mx-2'>{category.namear}</span>
            </div>
            {allowEdit&&<div className='col'>
                <IconButton 
                    color="error"
                    disabled = {category.subcategories.length>0} 
                    onClick={ async ()=>{
                        setselectedCategory(category);
                        setopenConfirmDelDlg(true);
                    }}
                >
                    <Delete/>
                </IconButton>
                <IconButton 
                        color="primary"
                        disabled ={category.categorytype !=0}
                        onClick={ ()=>{
                            setselectedCategory({id:0,parentid:category.id,nameen:'',namear:'',logo:'',descriptionen:'',descriptionar:''});
                            setOpen(true)
                        }}
                    >
                    <AddCircleOutline/>
                </IconButton>
            <IconButton
             color="primary"
                aria-label="add to shopping cart"
                onClick={ ()=>{
                    setselectedCategory(category);
                    setOpen(true)
                }}
            >
                <Edit />
            </IconButton>
          </div>}    

        </div>
    )
  } 
  function renderCategory(category){
    return(

        
        <TreeItem
            nodeId={category.id.toString()}
            key={category.id}
            label={renderCategoryLabel(category)}
            onClick={()=>onSelect(category)}
        >
        {category.subcategories.map(sc=>renderCategory(sc))}
        </TreeItem>
    )
  }
    return (
        <div>
            {allowEdit&&<div>
                <IconButton 
                    color="primary"
                    aria-label="delete" 
                    onClick={()=>{
                        setselectedCategory({id:0,nameen:'',namear:'',logo:'',descriptionen:'',descriptionar:'',parentid:0});
                        setOpen(true)
                    }}
                >
                    <AddCircleOutline/>
                </IconButton>          
            </div>}

            <TreeView
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                
            >
                {baseCategories.map(bc=>renderCategory(bc))}
            </TreeView>

            
            <ConfirmDeleteDialog 
                open={openConfirmDelDlg} 
                setopen={setopenConfirmDelDlg}
                text={`catugure ${selectedCategory&&selectedCategory.nameen}  will be deleted permenantly, are you sure?`} 
                onConfirm ={async()=>{
                    if(!selectedCategory)return;
                    await categoriesService._delete(selectedCategory.id);
                    // await update();
                    }}
            /> 
            
            <CategoriesDialog
                open={open}
                setOpen={setOpen}
                category ={selectedCategory}
                // onUpdate={async()=>{await update()}}
            />
            
        </div>
    )
}
//=============================================================================================
export function CategoriesAdminPage({user}){
    const [selectedCategory,setselectedCategory] = useState(null)
    const [categories,setcategories] = useState([]);

    useEffect(()=>{
        update();
      }, []);
    
    async function update(){
        const _categories= await categoriesService._get();

        console.log(_categories);
        setcategories(_categories);
    }
    console.log(categories)
    
    return (
        <div className='row'>
            <div className='col'>
                <CategoriesTreeView 
                    allowEdit={true} 
                    onSelect ={(category)=>setselectedCategory(category)}
                    categories = {categories}
                />
            </div>
            <div className='col'>
                {selectedCategory&&<div>
                    <span className='text-primary mx-2'>{selectedCategory.id}</span>
                    <span className='text-primary mx-2'>{selectedCategory.publishednameen}</span>
                    <span className='text-primary mx-2'>{selectedCategory.publishednamear}</span>
                    </div>}
            </div>
        </div>
    )
}

