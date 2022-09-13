import React, { useEffect, useState } from "react";
import UsersProductsService from "../service/usersProductsService";
import { Edit, Delete, AddCircleOutline, Close,KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight } from "@mui/icons-material";
import ConfirmDeleteDialog from "./common/ConfirmDeleteDialog";
import {IconButton,Button,Dialog,AppBar,Toolbar,Typography} from "@mui/material";
import MyTextField from "./common/myTextField";
import brandsService from '../service/brandsService';
import originsService from '../service/originsService';
import categoriesService from '../service/categoriesService';
import unitsService from '../service/unitsService';
import productsService from '../service/productsService';
import AutoCompleteSelect from './common/AutoCompleteSelect'
import { CategoriesTreeView } from './categories';
import products from "./products";

//============================================================================
function StoreDialog({ open, setOpen, store, onUpdate }) {
    const [userid, setUserid] = useState(store ? store.userid : "");
    const[brand,setBrand]=useState(store?store.brand:'')
    const[products,setProducts]=useState(store?store.products:'')
    const[category,setCategory]=useState(store?store.category:'')
    const [productid, setProductid] = useState(store ? store.productid : "");
    const [quantity, setQuantity] = useState(store ? store.quantity : "");
    const [costprice, setCostprice] = useState(store ? store.costprice : "");
    const [salesprice, setSalesprice] = useState(store ? store.salesprice : "");
  
    useEffect(() => {
      if (!store) return;
      setUserid(store.userid);
      setProductid(store.productid);
      setQuantity(store.quantity);
      setCostprice(store.costprice);
      setSalesprice(store.salesprice);
      setBrand(store.brand)
      setProducts(store.products)
      setCategory(store.category)
    }, [store]);
  
    return (
      <Dialog fullScreen open={open}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={async () => {
                setOpen(false);
                store.productid = productid;
                store.userid = userid;
                store.quantity = quantity;
                store.costprice = costprice;
                store.salesprice = salesprice;
                store.brand=brand;
                store.products=products;
                store.category=category;
                await UsersProductsService._save(store);
                onUpdate();
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
  
        <div>
        <MyTextField label ={'userid'} disabled value ={store?store.userid:'***'}  />
        <MyTextField label ={'Brand Id'} disabled value ={store?store.brand:'***'}  />
        <MyTextField label ={'productid'}  disabled value ={store?store.productid:'***'}  />
        <MyTextField label ={'productDescribshion'}  disabled value ={store?store.products:'***'} />
        <MyTextField label ={'quantity'} placeholder = {'* quantity'} value ={quantity} setValue ={setQuantity}  />
        <MyTextField label ={'costprice'} placeholder = {'* costprice'} value ={costprice} setValue ={setCostprice}  />
        <MyTextField label ={'salesprice'} placeholder = {'* salesprice'} value ={salesprice} setValue ={setSalesprice}  />


        </div>
      </Dialog>
    );
  }
  
//============================================================================
function StoreTable({ userProducts }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [open, setOpen] = useState(false);
console.log('userProducts',userProducts);
  return (
    <div>
      <table className="table table-success table-striped">
        <thead  >
          <tr>
            <th>id</th>
            <th>Product Description</th>
            <th>quantity</th>
            <th>costprice</th>
            <th>salesprice</th>
          </tr>

          {userProducts &&
            userProducts.map((userProduct) => (
              <tr key={userProduct.id}>
                <td>{userProduct.id}</td>
                <td>{(userProduct.product)&&(userProduct.product.category)&& userProduct.product.category.publishednamear}
                {(userProduct.product)&&(userProduct.product.brand)&& (userProduct.product.brand.nameen!='none')&&userProduct.product.brand.nameen}
                {(userProduct.product)&& userProduct.product.descriptionar}
                </td>
                <td>{userProduct.quantity}</td>
                <td>{userProduct.costprice}</td>
                <td>{userProduct.salesprice}</td>

                <td>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => {
                      setSelectedStore(userProduct);
                      setopenConfirmDelDlg(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedStore(userProduct);
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
      <StoreDialog
      open={open}
      setOpen={setOpen}
      store={selectedStore}
      onUpdate={async () => {
        const _store = await UsersProductsService._get();
      }}
    />

    <ConfirmDeleteDialog
      open={openConfirmDelDlg}
      setopen={setopenConfirmDelDlg}
      text={`usersStore ${
        selectedStore && selectedStore.nameen
      }  will be deleted permenantly, are you sure?`}
      onConfirm={async () => {
        if (!selectedStore) return;
        await UsersProductsService._delete(selectedStore.id);
      }}
    />

   
    </div>
  );
}
//=========================================================================
// export default function UsersStore({user}) {
//     const [userProducts, setuserProducts] = useState([]);
//     // const [selectedStore, setSelectedStore] = useState(null);
//     useEffect(() => {
//       update();
//     }, []);
  
//     async function update() {
//       const _alluserProducts = await UsersProductsService._get();
//       const _userProducts = _alluserProducts.filter(up=>up.userid == user.id);
//       setuserProducts(_userProducts);

//     }  
//     return (
//       <div>
//         <StoreTable userProducts={userProducts} />
//       </div>
//     );
//   }
  //=================================================================================

  export default function UsersStore({user}) {
    const [userProducts, setUserProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories,setcategories] = useState([]);
    // const [products, setProducts] = useState([]);
    const [selectedProductCategory,setselectedProductCategory] = useState(null)
    const [dispUserProducts, setdispUserProducts] = useState([]);
    const[selectedProduct, setSelectedProduct]= useState(null);
    // const [open, setOpen] = useState(false);
    // const[origin,setOrigin]=useState([]);
    // const[units,setUnits]=useState([]);
    
    const [selectedBrand,setselectedBrand] = useState(null)
    const[selectedOrigin, setSelectedOrigin]= useState(null);
    const [showLeftDiv,setshowLeftDiv] = useState(true);
    useEffect(()=>{
      update();
    }, []);
  
  async function update(){
    if(!user) return;
    const _alluserProducts = await UsersProductsService._get();
    const _userProducts = _alluserProducts.filter(up=>up.userid == user.id);
    let _allProducts= await productsService._get();
    const _allBrands= await brandsService._get();
    const _allOrigins= await originsService._get();
    const _allCategories= await categoriesService._get();
    const _allUnits= await unitsService._get();
    
    _userProducts.forEach(up=>{
      const product = _allProducts.find(p=>p.id == up.productid);
      if(product){ 
        up.product = product;
          product.brand = _allBrands.find(br=>br.id == product.brandid); 
          product.origin = _allOrigins.find(or=>or.id== product.originid);
          product.category = _allCategories.find(cat=>cat.id== product.categoryid);
          if(!product.category.userProducts)product.category.userProducts = [];
          product.category.userProducts.push(up);
          product.unit = _allUnits.find(un =>un.id==product.unitid)
      } 
    })

    // _categories.forEach(category=>{
    //     category.userProducts = _products.filter(p=>p.categoryid == category.id)
    // })

    setUserProducts(_userProducts);
    setBrands(_allBrands);
    setcategories(_allCategories)
    setdispUserProducts(_userProducts);
    
      // setSelectedProduct(null);
      // setProducts(_products);
      // setBrands(_brands);
      // setselectedBrand(null);
      // setSelectedOrigin(null);
      // setOrigin(_origins);
      // setUnits(_units);
      // setcategories(_categories);
      // setdispProducts(_products);
    }

      return (
          <div className='row'>
              {showLeftDiv&&<div className='col'>
                <div className='row m-2'>
                  <AutoCompleteSelect
                    textLabel ='Brand'
                    options ={brands}
                    selectedOption = {selectedBrand}
                    // onChange ={(brand)=>setselectedBrand(brand)}
                    labelOption = 'nameen'
                    labelImage = 'logo'
                  />
                </div>
                  <div className='row m-2'>
                    <AutoCompleteSelect
                      textLabel ='Origin'
                      options ={origin}
                      selectedOption = {selectedOrigin}
                      // onChange ={(origin)=>setSelectedOrigin(origin)}
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
                      if(category&&category.userProducts){
                        setdispUserProducts(category.userProducts);
                      }
                      if(category&&category.categorytype !=0)
                          setselectedProductCategory(category)
                      else
                          setselectedProductCategory(null)
                    }}
                  />
                </div>
              </div>}

              <div className='col'>
                      <div>
                        <IconButton onClick={()=>setshowLeftDiv(!showLeftDiv)}>
                        {showLeftDiv?<KeyboardDoubleArrowLeft/>:<KeyboardDoubleArrowRight/>}
                        </IconButton>
                      </div>
                      <StoreTable userProducts={userProducts} 
                      />
                    
              </div>
           </div>         
      )
  }
  //=========================================================================================================

  



  
   //   <StoreDialog
    //     open={open}
    //     setOpen={setOpen}
    //     store={selectedStore}
    //     onUpdate={async () => {
    //       const _store = await UsersProductsService._get();
    //     }}
    //   />

    //   <ConfirmDeleteDialog
    //     open={openConfirmDelDlg}
    //     setopen={setopenConfirmDelDlg}
    //     text={`usersStore ${
    //       selectedStore && selectedStore.nameen
    //     }  will be deleted permenantly, are you sure?`}
    //     onConfirm={async () => {
    //       if (!selectedStore) return;
    //       await UsersProductsService._delete(selectedStore.id);
    //     }}
    //   />