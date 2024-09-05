import { Button, Flex, FormControl, FormLabel, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import TableSkeleton from './TableSkeleton';
import { IProduct } from '../interfaces';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomDialog from '../shared/AlertDialog';
import axios, { AxiosResponse } from 'axios';
import CustomModal from '../shared/CustomModal';
import CookieService from '../classes/CookieService';

function ProductsTable() {
  const [tempID,setTempID] = useState(0)
  const [isDelete,setIsDelete] = useState(false)
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [productToEdit,setProductToEdit] = useState<IProduct>({
    id:0,
    attributes:{
      title:"",
      category:"",
      description:"",
      price:0,
      stock:0,
      thumbnail:{
        data:{
          attributes:{
            url:""
          }
        }
      }

    }

  })
  const [product,setProduct] = useState<IProduct>({
    id:0,
    attributes:{
      title:"",
      category:"",
      description:"",
      price:0,
      stock:0,
      thumbnail:{
        data:{
          attributes:{
            url:""
          }
        }
      }

    }

  })
  console.log(productToEdit)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpenModal, onOpen:onOpenModl, onClose:onCloseModal } = useDisclosure();
  const { isOpen:isOpenCreateModal, onOpen:onOpenCreateModal, onClose:onCloseCreateModal } = useDisclosure();

  // api.js
 const fetchData = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products?populate=products,thumbnail`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
const { data, error, isLoading,isSuccess } = useQuery(['PRoducts'], fetchData);
 console.log(isSuccess)

const destroyProduct =async(id:number)=>{
  try {
    const response = await axios.delete(`http://localhost:1337/api/products/${id}`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIxMjQ0ODc3LCJleHAiOjE3MjM4MzY4Nzd9.eX1eMnSarrnRVAyeJEok1bSpM7fkeClp7vYVkmk8ozQ`
      }
    });
    setIsDelete(true)
    return response;
  } catch (error) {
    // Handle error
    console.error('There was an error making the delete request:', error);
    throw error;
  }
}
const onchangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
  console.log(e.target)
const {name,value} = e.target
setProductToEdit({
  ...productToEdit,
  attributes: {
    ...productToEdit.attributes,
    [name]: value,
  }
})
}
const onchangeFileHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{

  if (e.target.files && e.target.files.length > 0) {
    setThumbnail(e.target.files[0]);
  }
}
const onchangePriceHandler = (val:any)=>{
setProductToEdit({
  ...productToEdit,
  attributes: {
    ...productToEdit.attributes,
    price: +val,
  }
})
}
const onchangeStockHandler = (val:any)=>{
  setProductToEdit({
    ...productToEdit,
    attributes: {
      ...productToEdit.attributes,
      stock: +val,
    }
  })
  }
// useEffect(()=>{
//   if(isDelete){
//     setTempID(0)
//   onClose()
//   }
  
// },[isDelete])
const updateProduct = async(id:number,data:any)=>{
    await axios.put(`http://localhost:1337/api/products/${id}`,data,{
      headers:{
        Authorization:`Bearer ${CookieService.get("jwt")}`
      }
    })
}
const CreateProduct = async(data:any)=>{
  await axios.post(`http://localhost:1337/api/products`,data,{
    headers:{
      Authorization:`Bearer ${CookieService.get("jwt")}`
    }
  })
}
const onSubmitHandler =() => {
  const formData = new FormData()
  formData.append("data",JSON.stringify({
    title:productToEdit.attributes.title,
    description:productToEdit.attributes.description,
    price:productToEdit.attributes.price,
    stock:productToEdit.attributes.stock,
  }))
  if (thumbnail) {
    formData.append("files.thumbnail", thumbnail);
}
updateProduct(productToEdit.id,formData)
fetchData()
}

const onChangeCreateHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
const {name,value} = e.target
setProduct({
  ...product,
  attributes: {
    ...product.attributes,
    [name]: value,
  }
})
}

const onchangeCreatePriceHandler =(val:any)=>{
  setProduct({
    ...product,
    attributes: {
      ...product.attributes,
      price: +val,
    }
  })
  }
  const onchangeCreateStockHandler = (val:any)=>{
    setProduct({
      ...product,
      attributes: {
        ...product.attributes,
        stock: +val,
      }
    })
    }

const onchangeCreateFileHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{

  if (e.target.files && e.target.files.length > 0) {
    setThumbnail(e.target.files[0]);
  }
} 
const onSubmitCreateHandler =()=>{

  const formData = new FormData()
  formData.append("data",JSON.stringify({
    title:product.attributes.title,
    description:product.attributes.description,
    price:product.attributes.price,
    stock:product.attributes.stock,
  }))
  if (thumbnail) {
    formData.append("files.thumbnail", thumbnail);
}
CreateProduct(formData)
}

if(isLoading){
  return <TableSkeleton />
}
  

  return (
    <>
      <Button  colorScheme='green' variant={"solid"} onClick={onOpenCreateModal}>Create</Button>

      <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Title</Th>
        <Th>Category</Th>
        <Th>Thumbnail</Th>
        <Th isNumeric>Price</Th>
        <Th isNumeric>Stock</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        data?.data?.length > 0 ?
        data?.data?.map((product:IProduct)=>{
          return ( 
             <Tr>
            <Th>{product.id}</Th>
            <Th>{product.attributes.title}</Th>
            <Th>{product.attributes.category}</Th>
            <Th>
            <Image
            src={`${import.meta.env.VITE_SERVER_URL}${product.attributes.thumbnail.data.attributes.url}`}
            alt={product.attributes.title}
            w={"20"}
            h={"20"}
            rounded={"full"}
            objectFit={"cover"}
            mr={5}
            
        />
            </Th>
            <Th isNumeric>{product.attributes.price}</Th>
            <Th isNumeric>{product.attributes.stock}</Th>
            <Th>
              <Flex justifyContent={"space-around"}>
              <Button as={Link} to={`/product/${product.id}`} colorScheme='green' variant={"solid"} ><FaRegEyeSlash /></Button>

                <Button colorScheme='blue' variant={"solid"} onClick={()=>{
                  setProductToEdit(product)
                  onOpenModl()
                  }}><CiEdit /></Button>
                <Button colorScheme='red' variant={"solid"} onClick={()=>{
                  setTempID(product.id)
                  onOpen()
                }
              
                }><CiTrash /></Button>
              </Flex>
              </Th>
          </Tr>)
        })
       :"theres no products "
      }
      
    </Tbody>
  </Table>
</TableContainer>
<CustomDialog isOpen={isOpen} onClose={onClose} onOpen={onOpen} title='are you sure destroy product ?' 
description='destroy the product from database'
cancelTxt='cancel' okTxt='destroy' variant='solid' onOkHandler={()=>destroyProduct(tempID)}
/>
<CustomModal isOpen={isOpenModal} title='Update Product' onClose={onCloseModal} onSubmitHandler={onSubmitHandler}>
    <FormControl>
      <FormLabel>Title</FormLabel>
      <Input name='title' value={productToEdit?.attributes?.title} placeholder='Product Title' onChange={onchangeHandler} />
    </FormControl>
    <FormControl>
      <FormLabel>Descripion</FormLabel>
      <Input name="description" value={productToEdit?.attributes?.description} onChange={onchangeHandler} placeholder='Product Title' />
    </FormControl>
    <FormControl>
      <FormLabel>Price</FormLabel>
      <NumberInput value={productToEdit?.attributes?.price} onChange={onchangePriceHandler} name='price'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper  />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl>
      <FormLabel>Stock</FormLabel>
      <NumberInput name='stock' value={productToEdit?.attributes?.stock} onChange={onchangeStockHandler}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper  />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl>
    <Input name='url' onChange={onchangeFileHandler} placeholder='Select Date and Time' size='md' type='file' />
    </FormControl>
</CustomModal>

 {/* create product*/}
 <CustomModal isOpen={isOpenCreateModal} title='Create Product' onClose={onCloseCreateModal} onSubmitHandler={onSubmitCreateHandler}>
    <FormControl>
      <FormLabel>Title</FormLabel>
      <Input name='title' value={product?.attributes?.title} placeholder='Product Title' onChange={onChangeCreateHandler} />
    </FormControl>
    <FormControl>
      <FormLabel>Descripion</FormLabel>
      <Input name="description" value={product?.attributes?.description} onChange={onChangeCreateHandler} placeholder='Product Title' />
    </FormControl>
    <FormControl>
      <FormLabel>Price</FormLabel>
      <NumberInput value={product?.attributes?.price} onChange={onchangeCreatePriceHandler} name='price'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper  />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl>
      <FormLabel>Stock</FormLabel>
      <NumberInput name='stock' value={product?.attributes?.stock} onChange={onchangeCreateStockHandler}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper  />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl>
    <Input name='url' onChange={onchangeCreateFileHandler} placeholder='Select Date and Time' size='md' type='file' />
    </FormControl>
</CustomModal>
{/* crate product */}
    </>
  )
}

export default ProductsTable