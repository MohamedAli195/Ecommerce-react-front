'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
  LinkBox,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import CookieService from '../classes/CookieService'
import { useSelector } from 'react-redux'
import { selectCart } from '../app/featuers/CartSlice'
import { useDispatch } from 'react-redux'
import { onOpenDrawer } from '../app/featuers/GlobalSlice'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props
  
 
  return (
    <Link
        as = {RouterLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      >
      {children}
    </Link>
  )
}
const Links = [{link:'Dashboard',to:'Dashboard'}, {link:'Projects',to:'Projects'}, {link:'Team',to:'Team'},{link:'products',to:'products'}]

export default function Navbar() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  console.log(cart)
const token =CookieService.get("jwt")

  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const logoutHandler = ()=>{
    CookieService.remove("jwt")
    window.location.reload()
  }
  const onOpenHandler = ()=>{
    dispatch(onOpenDrawer())
}
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <RouterLink  key={link.link} to={link.to} >{link.link}</RouterLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={onOpenHandler}>
                cart ({cart.cart.length})
              </Button>
              {
                token ? (<Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu> ) : (
                 <Button as={RouterLink} fontSize={'sm'} fontWeight={400} variant={'link'} to={'login'}>
                     Log In</Button>)
              }
           
              
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}