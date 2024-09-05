import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { IProduct } from "../interfaces"
import { useDispatch } from "react-redux"
import { addToCart } from "../app/featuers/CartSlice"
interface IProps {
  product:IProduct
}
function ProductCard({product}:IProps) {
  const dispatch = useDispatch()
  const {attributes,id} = product
  const {category,description,price,stock,thumbnail,title} = attributes

  const addToCartHandler = ()=>{
    dispatch(addToCart(product))
  }
  return (

<Card width={"sm"}>
  <CardBody>
    <Image
      src={`${import.meta.env.VITE_SERVER_URL}${attributes?.thumbnail?.data.attributes.url}`}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>{description}</Text>
      <Text color='blue.600' fontSize='2xl'>
        {price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
      <Button as={Link} to={`/product/${id}`} width={"lg"} variant='solid' colorScheme='blue'>
        Details
      </Button>
      <Button  width={"lg"} variant='solid' colorScheme='purple' onClick={addToCartHandler}>
        Add To Cart
      </Button>
      
  </CardFooter>

</Card>)
}

export default ProductCard