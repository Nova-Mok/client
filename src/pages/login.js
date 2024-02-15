'use strict';

import {
  Button,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Center,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import Blur from '../components/Blue';

const Login = () => {
  const handleLoginClick = () => {
    // Redirect to /search page
    window.location.href = '/search';
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={6}
        my={12}
      >
        <Box mb={4} align={'center'}>
          {/* Replace with the correct path to your logo image */}
          <img src="/logo.png" alt="Logo" style={{ borderRadius:"20px" , maxWidth: '20%', height: 'auto' }} />
        </Box>
        <Heading align={'center'} lineHeight={1.1} fontSize={{ base: 'md', md: '3xl' }}>
          Plug & Play Solution by NEXTAI
        </Heading>
        <Stack spacing={6}>
          <Button onClick={handleLoginClick} w={'full'} >
            <Center>
              <Text marginTop={3.5}>Try SearchMate!</Text>
            </Center>
          </Button>
        </Stack>
      </Stack>
      <Blur position={'absolute'} top={-20} left={-20} style={{ filter: 'blur(70px)' }} />
    </Flex>
  );
};

export default Login;
