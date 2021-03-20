import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, CircularProgress, Flex } from "@chakra-ui/react";
import BlogRepo from "repositories/blogs";
import PostReview from "containers/PostReview";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = BlogRepo.onBlogs((posts) => {
      setBlogs(posts);
      setIsFetching(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box bg="accent.50" as="section">
      <Box px={{ base: "24px", md: "40px" }} width={{ base: "auto", lg: "80%" }} maxWidth="1200px" mx="auto">
        <Heading textTransform="uppercase" textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} color="accent.400">
          Latest Posts
        </Heading>

        {isFetching ? (
          <Flex py={{ base: "50px" }} alignItems="center" justifyContent="center">
            <CircularProgress isIndeterminate color="teal.300" />
          </Flex>
        ) : (
          <SimpleGrid py={{ base: "64px", md: "80px" }} columns={{ base: 1, md: 2 }} spacing="40px">
            {blogs.map((blogId) => (
              <PostReview key={blogId} blogId={blogId} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Blogs;
