import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import ProductSkelton from '../components/ProductSkelton'
import ProductCard from '../components/ProductCard'
import { Box, Button } from '@chakra-ui/react'

function Product() {
    const {id} = useParams()
    const navigate = useNavigate()
    const getProducts = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=products,thumbnail`)
        return data
      }
      
      const {data,isLoading,error} = useQuery(['Products',id], getProducts)
    //   const {attributes}= data
    //   const {category,description,price,stock,thumbnail,title} = attributes
    const goBack = ()=>navigate(-1)
        useEffect(()=>{
        document.title = `${data?.data?.attributes?.title} Page`
      },[data?.data?.attributes?.title])
    console.log(data)
      if(isLoading) {
          return (
            <Box maxW="sm" mx={"auto"} my={20}>
            
            
            <ProductSkelton />
            
            </Box>
            
          )
      }
  return (
    <>
    <Button onClick={goBack} >back</Button>
    <ProductCard product={data?.data} />

    </>

  )
}

export default Product