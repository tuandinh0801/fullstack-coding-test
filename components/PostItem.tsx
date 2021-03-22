import React from "react";
import { Flex, Box, Link, Image, Heading } from "@chakra-ui/react";

type PostItemProps = {
  image: string;
  title: string;
  content: string;
  onOpen: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ image, title, content, onOpen }) => {
  return (
    <Flex
      cursor="pointer"
      direction="column"
      position="relative"
      bg="white"
      as="article"
      shadow="md"
      borderRadius={8}
      overflow="hidden"
      onClick={onOpen}>
      <Box role="group" height="260px" width="100%" pos="relative">
        <Box
          as={Image}
          width="900"
          height="550"
          position="absolute"
          boxSize="100%"
          objectFit="cover"
          top="0"
          left="0"
          maxWidth="100%"
          src={image}
          alt={title}
        />
      </Box>

      <Flex p="40px" flexGrow={1} direction="column">
        <Heading fontSize="2xl" as="h4" textTransform="uppercase">
          {title}
        </Heading>
        <Box
          my="20px"
          flex="1"
          color="gray.700"
          dangerouslySetInnerHTML={{
            __html: `
            ${content.substr(0, 100)}\n
            ...Read more
            `,
          }}></Box>
      </Flex>
    </Flex>
  );
};

export default PostItem;
