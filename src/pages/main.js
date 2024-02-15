import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
  Avatar,
  HStack,
  Spinner, 
  Collapse,
  IconButton,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import ProductCard from "../components/products";
import Success from "../components/Headline";
import { ChatIcon } from "@chakra-ui/icons";
import LoadingMessage from "../components/LoadingMessage";

const SearchComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Fetching the best clothing...");
  const loadingMessages = ["Fetching the best clothing...", "Entering the inventory"];
  let messageIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      messageIndex.current = (messageIndex.current + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex.current]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        content:
          "Hey there! Let me assist you in finding the perfect clothes for yourself and make your shopping experience truly amazing.",
      },
    ]);
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://34.67.113.151:8883/search", {
        query: userInput,
      });
      const responseData = response.data;
      const productsData = JSON.parse(responseData.products);

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: userInput },
        { type: "bot", content: responseData.bot },
      ]);

      setApiResponse({
        products: productsData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" >
      {/* Product Details Section */}
      <Box w="full" overflowY="auto" p="4" bg="white">
        <Text fontSize="xl" mb="4">
          Products
        </Text>
        {loading ? (
          <LoadingMessage message={loadingMessage} />
        ) : (
          apiResponse &&
          apiResponse.products &&
          Array.isArray(apiResponse.products) ? (
            <VStack align="start" spacing={4}>
              {apiResponse.products
                .reduce((rows, product, index) => {
                  if (index % 3 === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(product);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <HStack key={rowIndex} spacing={4}>
                    {row.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </HStack>
                ))}
            </VStack>
          ) : (
            <Success />
          )
        )}
      </Box>

      {/* Chat Box - Minimized and Expanded Views */}
      <Box position="fixed" bottom="20px" right="20px" zIndex="overlay">
        <Collapse in={isChatOpen} animateOpacity>
          <Box bg="gray.100" maxWidth="400px" borderRadius="xl" boxShadow="md">
            {/* Chat Messages */}
            <Flex
              p="2"
              borderBottom="1px"
              borderColor="gray.200"
              align="center"
              bg="gray.300"
              color="white"
            >
              {/* Chat Header */}
              <Image
                src="https://assets-global.website-files.com/650e8bc46cf62f0b69fd76a1/650e8cf0ad757160aa514598_Screenshot_2023-09-06_at_1.20.16_PM-removebg-preview.png"
                alt="Logo"
                boxSize="60px"
                objectFit="contain"
                mr="4"
                minW={100}
              />
              <Text
                bgGradient="linear(to-l, purple.500, pink.600)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
                textAlign={"center"}
                marginTop={3}
              >
                Smart Search
              </Text>
            </Flex>
            <Box
              ref={chatBoxRef}
              overflowY="auto"
              p="4"
              maxHeight="calc(100vh - 80px)"
            >
              {/* Chat Messages */}
              {messages.map((message, index) => (
                <Flex
                  key={index}
                  justifyContent={
                    message.type === "user" ? "flex-end" : "flex-start"
                  }
                  mb="2"
                  alignItems="flex-end"
                >
                  {message.type === "user" && (
                    <Box>
                      <Avatar
                        size="xs"
                        src="https://bit.ly/sage-adebayo"
                        name="User"
                        mr="2"
                      />
                      <Box
                        p="2"
                        borderRadius="lg"
                        maxW="100%"
                        wordBreak="break-word"
                        bgGradient={[
                          "linear(to-b, orange.100, purple.300)",
                          "linear(to-t, blue.200, teal.500)",
                          "linear(to-b, orange.100, purple.300)",
                          "linear(to-tr, teal.300, yellow.400)",
                        ]}
                        fontSize={"small"}
                      >
                        {message.content}
                      </Box>
                    </Box>
                  )}

                  {message.type === "bot" && (
                    <Box>
                      <Box
                        p="3"
                        borderRadius="lg"
                        maxW="70%"
                        wordBreak="break-word"
                        bgGradient={[
                          "linear(to-tr, teal.300, yellow.400)",
                          "linear(to-t, blue.200, teal.500)",
                          "linear(to-b, orange.100, purple.300)",
                        ]}
                        color="black"
                        fontSize={"small"}
                      >
                        {message.content}
                      </Box>
                      <Avatar
                        size="xs"
                        name="Bot"
                        src="https://t4.ftcdn.net/jpg/05/81/63/87/240_F_581638789_P4KRyzlpaPlEhqFU0tIkQPiHNUw0Qmt5.jpg"
                        ml="2"
                      />
                    </Box>
                  )}
                </Flex>
              ))}
            </Box>

            {/* User Input Section */}
            <Flex
              p="4"
              borderTop="1px"
              borderColor="gray.200"
              align="center"
              bg="gray.100"
              maxHeight="60px"
            >
              <Input
                variant="outline"
                flex="1"
                mr="2"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
              />
              <Button bgColor={"purple.200"} color="black" onClick={handleSearch} disabled={loading}>
                {loading ? "Loading..." : "Send"}
              </Button>
            </Flex>
          </Box>
        </Collapse>
        <IconButton
          icon={<ChatIcon />}
          isRound
          size="lg"
          colorScheme="purple"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Toggle chat"
        />
      </Box>
    </Flex>
  );
};

export default SearchComponent;
