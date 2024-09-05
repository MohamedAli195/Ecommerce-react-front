'use client'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLogin, userLogin } from '../app/featuers/LoginSlice'
import { AppDispatch } from '../app/store'
interface IUser {identifier:string,password:string}
export default function Login() 
{
  const dispatch:AppDispatch = useDispatch()
  const {data,error,loading} = useSelector(selectLogin)
  
  
  const [showPassword, setShowPassword] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [user,setUser] = useState<IUser>({
        identifier:"",
        password:""
    })

    const handlerOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        

    }
    const handlerSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()


        if(!user.identifier && !user.password){

          setIsEmail(true)
          setIsPassword(true)
            
            return
        }
        if(!user.identifier){
            setIsEmail(true)
            
            return
        }
        if(!user.password){
            setIsPassword(true)
            return
        }
        setIsEmail(false)
        setIsPassword(false)
        dispatch(userLogin(user))
        console.log(user)
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as={'form'}
          onSubmit={handlerSubmit}
        
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input isInvalid={isEmail} type="email" name='identifier' value={user.identifier}  onChange={handlerOnChange}/>
           { isEmail? <FormHelperText>email is required</FormHelperText>:null}

            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input isInvalid={isPassword} type={showPassword ? 'text' : 'password'} name='password' value={user.password} onChange={handlerOnChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
           { isPassword? <FormHelperText>password is required</FormHelperText>:null}


            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
              type={'submit'}
                bg={isEmail||isPassword?'red.500':'blue.500'}
                color={'white'}
                _hover={{
                  bg: isEmail||isPassword?'red.400':'blue.400',
                }}
                isLoading={loading}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}