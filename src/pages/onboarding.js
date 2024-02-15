import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { TriangleUpIcon, CloseIcon } from "@chakra-ui/icons";
import Lottie from "lottie-react";
import animationData from "../assets/images/upload.json";
import { S3 } from "aws-sdk"; 
import { ToastContainer, toast } from "react-toastify";

const s3 = new S3({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_REGION",
});

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const FileUpload = ({ onFileRemove, uploadedFiles }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const files = acceptedFiles.map((file) => ({
        ...file,
        id: Math.random().toString(36).substring(7),
      }));
      console.log("Accepted Files:", files);
      onFileRemove([...uploadedFiles, ...files]);
    }
  };

  const removeFile = (file) => {
    const filteredFiles = uploadedFiles.filter((uploadedFile) => {
      return uploadedFile.id !== file.id;
    });
    onFileRemove(filteredFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      border="2px dashed #E2E8F0"
      borderRadius="md"
      padding="4"
      textAlign="center"
      cursor="pointer"
      transition="border-color 0.3s"
      _hover={{ borderColor: "gray.500" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {uploadedFiles.length > 0 ? (
        <>
          {uploadedFiles.map((file) => (
            <Box key={file.id}>
              <Text fontSize="lg" color="gray.600" mb="2">
                {file.path}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                color="red.500"
                onClick={() => removeFile(file)}
              >
                <Icon as={CloseIcon} />
              </Button>
            </Box>
          ))}
        </>
      ) : (
        <>
          <Icon as={TriangleUpIcon} fontSize="2xl" color="gray.500" mb="1" />
          <Text fontSize="lg" color="gray.600">
            Drag & drop your files here, or click to select them
          </Text>
        </>
      )}
    </Box>
  );
};

export default function JoinOurTeam() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const toast = useToast(); 

  const handleFileRemove = (files) => {
    setUploadedFiles(files);
  };

  const handleUpload = async () => {
    try {
      if (uploadedFiles.length === 0) {
        toast({
          title: "No files to upload",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      for (const file of uploadedFiles) {
        const params = {
          Bucket: "YOUR_BUCKET_NAME",
          Key: file.name,
          Body: file,
        };

        await s3.upload(params).promise();
      }

      setUploadedFiles([]);
      toast({
        title: "Data uploaded to S3 successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading files to S3:", error);
      toast({
        title: "Data upload failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="relative">
      <Container
        as={SimpleGrid}
        maxW="7xl"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={2}>
          <Heading lineHeight={1} fontSize={40}>
            <Text
              as="span"
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              SearchMate
            </Text>{" "}
            The GenAI Tool For Your ECommerce Needs.
          </Heading>
          <Stack direction="row" spacing={2} align="center">
            <Lottie animationData={animationData} style={{ width: "85%" }} />
          </Stack>
        </Stack>
        <Stack
          bg="gray.50"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
          maxH={535}
          mt={-10}
        >
          <Stack spacing={4}>
            <Heading color="gray.800" lineHeight={1.1} fontSize="md">
              Upload your Inventory Data
              <Text
                as="span"
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Discover the perfect product with ease. Our Smart Search plugin,
              powered by cutting-edge AI, intuitively navigates customers to
              their desired items, enriching their shopping journey while
              boosting your sales and user satisfaction.
            </Text>
          </Stack>
          <Box as="form" mt={-2}>
            <Stack spacing={4}>
              <Input
                placeholder="Inventory Dataset Name"
                bg="gray.100"
                border={0}
                color="gray.500"
                required
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Store Name"
                bg="gray.100"
                border={0}
                color="gray.500"
                required
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <FileUpload
                uploadedFiles={uploadedFiles}
                onFileRemove={handleFileRemove}
              />
            </Stack>
            <Button
              fontFamily="heading"
              mt={8}
              w="full"
              bgGradient="linear(to-r, red.400,pink.400)"
              color="white"
              onClick={handleUpload}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Upload
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position="absolute"
        top={-20}
        left={-20}
        style={{ filter: "blur(80px)" }}
      />
    </Box>
  );
}
