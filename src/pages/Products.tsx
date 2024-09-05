import { Grid } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import { IProduct } from '../interfaces'
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductSkelton from '../components/ProductSkelton'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductList } from '../app/featuers/product/productsSlice'
import { AppDispatch } from '../app/store'

function Products() {
  const dispatch = useDispatch<AppDispatch>()
  // const getProducts = async()=>{
  //   const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products?populate=products,thumbnail`)
  //   return data
  // }

  
  // const {data,isLoading,error} = useQuery('Products', getProducts)
  
  // if(isLoading) {
  //     return (<Grid templateColumns={"repeat(auto-fill,minmax(400px,1fr))"} gap={4}>
  //       {Array.from({length:10},(_,indx)=>(<ProductSkelton key={indx} />))}
  //     </Grid>)
  // }
  useEffect(()=>{
    dispatch(getProductList)
    console.log("use")
  },[dispatch])
  return (
    <Grid templateColumns={"repeat(auto-fill,minmax(400px,1fr))"} gap={4}>
      {
        [].map((product:IProduct)=>{
          return (
            <ProductCard product={product} key={product.id}/>

          )
        })
      }
    </Grid >
    
  )
}

export default Products