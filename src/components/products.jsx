import React,{ useState ,useEffect} from 'react';
import productsService from '../service/productsService';
import AutoCompleteSelect from './common/AutoCompleteSelect'
import { CategoriesTreeView } from './categories';
import brandsService from '../service/brandsService';
import originsService from '../service/originsService';
import {AddCircleOutline,Close,Delete,Edit} from '@mui/icons-material';
import {IconButton,Button,Dialog,AppBar,Toolbar,Typography} from '@mui/material';
import MyTextField from './common/myTextField';
import ConfirmDeleteDialog from './common/ConfirmDeleteDialog';
import categoriesService from '../service/categoriesService';
import unitsService from '../service/unitsService';
//=============================================================================================================================================
function ProductsTable({products,units,onUpdate}) {
  const[selectedProduct, setSelectedProduct]= useState(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div>
    <table className='table '>
    <thead>
    <tr>
        <th>id</th>
        <th>Product Description</th>
        <th>Brand</th>
        <th>Origin</th>
        <th>quantity</th>
        <th>unit</th>
        <th>barcode</th>
        <th>descriptionen</th>
        <th>descriptionar</th>
        <th>image</th>
        <th>Actions</th>
        
    </tr>
    </thead>
    {products.map((product)=>(
        <tr key={product.id}>
        <td>{product.id}</td>
        <td>{(product.category)&&product.category.publishednamear}</td>
        <td>{(product.brand)&&(product.brand.nameen !='none')&&product.brand.nameen }</td>
        <td>{(product.origin)&&product.origin.nameen}</td>
        <td>{product.quantity}</td>
        <td>{(product.unit)&&product.unit.nameen}</td>
        <td>{product.barcode}</td>
        <td>{product.descriptionen}</td>
        <td>{product.descriptionar}</td>
        <td>  <img src={product.image}  alt='url' width={100} ></img></td>
        <td>

        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => {
            setSelectedProduct(product);
            setopenConfirmDelDlg(true)
          }}
        >
          <Delete />
        </IconButton>
      </td>
      <td>
      <IconButton color="primary" 
          onClick={()=>{
            setSelectedProduct(product);
            setOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        </td>
      </tr>
    

    )
      )}

    </table>
    <ProductsDialog
      units = {units}
      open={open}
      setOpen={setOpen}
      product ={selectedProduct}
      onUpdate = {async ()=>{onUpdate()}}
    />
    
    <ConfirmDeleteDialog 
      open={openConfirmDelDlg} 
      setopen={setopenConfirmDelDlg}
      text={`Product ${selectedProduct&&selectedProduct.barcode}  will be deleted permenantly, are you sure?`} 
      onConfirm ={async()=>{
          if(!selectedProduct)return;
          await productsService._delete(selectedProduct.id);
          onUpdate();
     }}
    /> 
    </div>
  )
}
//========================================================================================================================
function ProductsDialog({open,setOpen,product,units,onUpdate}) {
  const [nameen,setNameen] = useState(product?product.nameen:'');
  const [namear,setNamear,] = useState(product?product.namear:'');
  const [image,setImage,] = useState(product?product.image:'');
  const[descriptionen,setdescriptionen]=useState(product?product.descriptionen:'');
  const [descriptionar,setdescriptionar] = useState(product?product.descriptionar:'');
  const[barcode,setBarcode]=useState(product?product.barcode:'')
  const[selectedUnit,setselectedUnit]=useState(null);
  const[quantity,setQuantity]=useState(product?product.quantity:'')
 
  useEffect(()=>{
    console.log('product',product);
    if(!product)return;
    setNameen(product.nameen);
    setNamear(product.namear);
    setImage(product.image);
    setdescriptionen(product.descriptionen);
    setdescriptionar(product.descriptionar);
    setBarcode(product.barcode);
    setQuantity(product.quantity);
    setselectedUnit(units.find(u=>u.id == product.unitid))
  }, [product]);

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
            <Close/>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          </Typography>
          <Button autoFocus color="inherit" 
            onClick= {async()=>{
                setOpen(false);
                product.nameen = nameen;
                product.namear = namear;
                product.image=image;
                product.descriptionen=descriptionen;
                product.descriptionar=descriptionar;
                product.barcode=barcode;
                product.quantity=quantity;
                product.unitid = selectedUnit.id;
                await productsService._save(product);
                onUpdate()}    
          }
            >
            save
          </Button>
        </Toolbar>
        </AppBar>
        
        <div>
        <MyTextField label ={'Brand Id'} disabled value ={product?product.brandid:'***'}  />
        <MyTextField label ={'Origin id'}  disabled value ={product?product.originid:'***'}  />
        <MyTextField label ={'Category'}  disabled value ={product?product.categoryid:'***'} />
        <MyTextField label ={'quantity'} placeholder = {'* quantity'} value ={quantity} setValue ={setQuantity}  />
        <AutoCompleteSelect
          textLabel ='Unit'
          options ={units}
          selectedOption = {selectedUnit}
          onChange ={(unit)=>setselectedUnit(unit)}
          labelOption = 'nameen'
        />
          <MyTextField label ={'Barcode'} placeholder = {'* Barcode'} value ={barcode} setValue ={setBarcode}  />
          <MyTextField label ={'Image'} placeholder = {'* image'} value ={image} setValue ={setImage}  />
          <MyTextField label ={' descriptionen '} placeholder = {'* descriptionen'} value ={descriptionen} setValue ={setdescriptionen} rows={4} multiline />
          <MyTextField label ={' descriptionar '} placeholder = {'* descriptionar'} value ={descriptionar} setValue ={setdescriptionar} rows={4} multiline/>
        </div>
</Dialog>
  )
}
//============================================================================================================
export default function Products() {
  const [selectedProductCategory,setselectedProductCategory] = useState(null)
  const [selectedBrand,setselectedBrand] = useState(null)
  const [products, setProducts] = useState([]);
  const [dispProducts, setdispProducts] = useState([]);
  const[selectedProduct, setSelectedProduct]= useState(null);
  const[selectedOrigin, setSelectedOrigin]= useState(null);
  const [categories,setcategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const[origin,setOrigin]=useState([]);
  const[units,setUnits]=useState([]);
  useEffect(()=>{
    update();
  }, []);

async function update(){
    const _products= await productsService._get();
    const _brands= await brandsService._get();
    const _origins= await originsService._get();
    const _categories= await categoriesService._get();
    const _units= await unitsService._get();
    _products.forEach(product=>{
        product.brand = _brands.find(br=>br.id == product.brandid); 
        product.origin = _origins.find(or=>or.id== product.originid);
        product.category = _categories.find(cat=>cat.id== product.categoryid);
        // if(product.category){
        //   if(!product.category.products) product.category.products = [];
        //   product.category.products.push(product);
        // }
        product.unit = _units.find(un =>un.id==product.unitid)
    })

    _categories.forEach(category=>{
      category.products = _products.filter(p=>p.categoryid == category.id)
    })
    setSelectedProduct(null);
    setProducts(_products);
    setBrands(_brands);
    setselectedBrand(null);
    setSelectedOrigin(null);
    setOrigin(_origins);
    setUnits(_units);
    setcategories(_categories);
    setdispProducts(_products);
  }
    return (
        <div className='row'>
            <div className='col'>
              <div className='row m-2'>
                <AutoCompleteSelect
                  textLabel ='Brand'
                  options ={brands}
                  selectedOption = {selectedBrand}
                  onChange ={(brand)=>setselectedBrand(brand)}
                  labelOption = 'nameen'
                  labelImage = 'logo'
                />
              </div>
                <div className='row m-2'>
                  <AutoCompleteSelect
                    textLabel ='Origin'
                    options ={origin}
                    selectedOption = {selectedOrigin}
                    onChange ={(origin)=>setSelectedOrigin(origin)}
                    labelOption = 'nameen'
                    labelImage = 'flag'
                  />
                </div>

              <div className='row m-2'>
                <CategoriesTreeView
                  className = 'm-2' 
                  allowEdit={false} 
                  categories = {categories}
                  onSelect ={(category)=>{
                    if(category&&category.products){
                      setdispProducts(category.products);
                    }
                    if(category&&category.categorytype !=0)
                        setselectedProductCategory(category)
                    else
                        setselectedProductCategory(null)
                  }}
                />
              </div>
            </div>
            <div className='col'>
                  <div className='row'>
                      <IconButton aria-label="delete"  color="secondary" className='my-auto'
                        disabled ={(!selectedBrand||!selectedOrigin||!selectedProductCategory)} 
                        onClick={ ()=>{
                          setSelectedProduct({id:0,brandid:selectedBrand.id,originid:selectedOrigin.id,categoryid:selectedProductCategory.id,nameen:'',namear:'',descriptionen:'',descriptionar:'',image:''});
                          setOpen(true);
                      }}
                        >
                        <AddCircleOutline />
                      </IconButton>
                  </div>
                  <div className='row'>
                    <ProductsTable 
                    products ={dispProducts} 
                    units = {units}
                     onUpdate ={async ()=>{await update()}}/>
                  </div>
              
            </div>

            <ProductsDialog
              open={open}
              setOpen={setOpen}
              product ={selectedProduct}
              units = {units}
              onUpdate = {async ()=>{await update()}}
            />
         </div>         
    )
}

