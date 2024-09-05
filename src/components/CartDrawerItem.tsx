import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { IProduct } from "../interfaces"
import { useDispatch } from "react-redux"
import { removeFromCart } from "../app/featuers/CartSlice"

interface IProps {
    product:IProduct
}
function CartDrawerItem({product}:IProps) {
    const {attributes,id,quantity} = product
    const {price,title,thumbnail} = attributes
    const dispatch = useDispatch()

  return (
   <>
   <Flex alignItems={"center"} mb={3}py={2}>
        <Image
            src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.data.attributes.url}`}
            alt={title}
            w={"20"}
            h={"20"}
            rounded={"full"}
            objectFit={"cover"}
            mr={5}
            
        />
        <Stack>
            <Box>
                <Text fontSize={"sm"}>title :{title}</Text>
                <Text fontSize={"sm"}>price :{price}</Text>

                <Text fontSize={"sm"}>quantity :{quantity}</Text>
            </Box>
            <Button variant="solid" colorScheme="red" size="xs" w="fit-content"
                onClick={()=>{dispatch(removeFromCart(id))}}
            >remove</Button>

        </Stack>

        

   </Flex>
   
   </>
  )
}

export default CartDrawerItem