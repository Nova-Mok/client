import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  const bgColor = useColorModeValue('white', 'gray.900');

  if (!product || product.length === 0) {
    return <Box>No product information available</Box>;
  }

  const {
    img: URL,
    name: Description,
    brand: BrandName,
    price: DiscountPrice,
    avg_rating: Ratings,
  } = product;

  // Format Ratings to display with one decimal place
  const formattedRatings = Ratings ? parseFloat(Ratings).toFixed(1) : 'N/A';

  return (
    <Center py={10} px={10}>
      <Box
        role={'group'}
        p={3}
        maxW={'350px'}
        w={'full'}
        bg={bgColor}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        m={3}
      >
        <a href={URL} target="_blank" rel="noopener noreferrer">
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'250px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${URL || 'default-image-url'})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(80px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={250}
              width={350}
              objectFit={'cover'}
              src={URL || 'default-image-url'}
              alt={Description}
            />
          </Box>
        </a>

        <Stack pt={2} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {BrandName}
          </Text>

          <Heading
            marginTop={'-20px'}
            textAlign={'center'}
            fontSize={'small'}
            fontFamily={'body'}
            fontWeight={600}
          >
            {Description}
          </Heading>

          <Stack marginTop={'-10px'} direction={'row'} align={'center'}>
            <Text fontWeight={700} fontSize={'md'}>
              {`₹${DiscountPrice}`}
            </Text>
            <Text fontSize={'sm'} color={'gray.400'}>
              {`Ratings: ${formattedRatings}`}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
