'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
      Discover the Perfect Product!
      </Heading>
      <Text color={'gray.500'}>
      Our Smart Search plugin, powered by cutting-edge AI, intuitively navigates customers to their desired items, enriching their shopping journey while boosting your sales and user satisfaction.
      </Text>
    </Box>
  )
}