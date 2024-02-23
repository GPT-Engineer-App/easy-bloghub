import React, { useState } from "react";
import { ChakraProvider, Container, VStack, Heading, Button, Input, Textarea, Box, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    // Call /login API endpoint
    try {
      const response = await fetch("https://backengine-m40z.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        toast({ title: "Logged in successfully!", status: "success" });
      } else {
        const errorData = await response.json();
        toast({ title: "Failed to log in", description: errorData.error, status: "error" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while logging in", status: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const fetchPosts = async () => {
    // Call /posts API endpoint to fetch posts
  };

  const createPost = async () => {
    // Call /posts API endpoint to create a new post
  };

  const deletePost = async (id) => {
    // Call /posts/{id} API endpoint to delete a post
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Heading>Blogging App</Heading>
          {!isLoggedIn ? (
            <VStack spacing={4} w="100%">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
                Login
              </Button>
            </VStack>
          ) : (
            <VStack spacing={4} w="100%">
              <Button onClick={handleLogout}>Logout</Button>
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
              <Button leftIcon={<FaEdit />} onClick={createPost}>
                Create Post
              </Button>
              {/* List of posts */}
              {posts.map((post) => (
                <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text mt={4}>{post.content}</Text>
                  <Button leftIcon={<FaTrash />} onClick={() => deletePost(post.id)} mt={4}>
                    Delete
                  </Button>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
