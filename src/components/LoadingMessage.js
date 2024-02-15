import React from 'react';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/images/loading.json'; 

const LoadingMessage = ({ message }) => {
  return (
    <Flex
      height="100vh" // Full viewport height
      alignItems="center" // Center vertically
      justifyContent="center" // Center horizontally
      direction="column" // Stack children vertically
    >
      <Lottie animationData={loaderAnimation} style={{ width: 250, height: 250 }} />
      <VStack align="start" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">{message}</Text>
      </VStack>
    </Flex>
  );
};

export default LoadingMessage;
