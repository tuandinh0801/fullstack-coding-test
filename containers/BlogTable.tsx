import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Image, Flex, Button, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Blogs from "repositories/blogs";

const BlogModal = dynamic(() => import("components/BlogModal"), { ssr: false });

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew } = useDisclosure();

  const fetchBlogs = useCallback(async () => {
    const blogData = await Blogs.getBlogs();
    setBlogs(blogData);
  }, [setBlogs]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (data) {
      onOpen();
    }
  }, [data, onOpen]);

  const handleClose = useCallback(() => {
    setData(null);
    onClose();
  }, [setData, onClose]);

  const handleUpdatePost = useCallback(
    async ({ title, image, content }) => {
      setLoading(true);
      await Blogs.updateBlog({ id: data.id, title, image, content });
      onClose();
      setData(null);
      fetchBlogs();
      setLoading(false);
    },
    [data, onClose, setData, fetchBlogs]
  );

  const handleCreatePost = useCallback(
    async ({ title, image, content }) => {
      setLoading(true);
      await Blogs.createBlog({ title, image, content });
      onCloseNew();
      fetchBlogs();
      setLoading(false);
    },
    [data, onCloseNew, setLoading, fetchBlogs]
  );

  const handleRemove = useCallback(
    async (id) => {
      await Blogs.deleteBlog(id);
      fetchBlogs();
    },
    [fetchBlogs]
  );

  return (
    <Fragment>
      <Flex justifyContent="flex-end" py={{ base: "24px", md: "40px" }}>
        <Button colorScheme="teal" onClick={onOpenNew}>
          Add blog
        </Button>
      </Flex>

      <Box borderRadius={12} borderWidth={1}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Image</Th>
              <Th>Content</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {blogs.map(({ id, title, image, content }) => (
              <Tr key={id}>
                <Td>{id}</Td>
                <Td>{title}</Td>
                <Td>
                  <Image height={50} src={image} alt={title} />
                </Td>
                <Td textOverflow="ellipsis" dangerouslySetInnerHTML={{ __html: content.substring(0, 100) }}></Td>
                <Td flexDirection="row" display="flex">
                  <Button
                    onClick={() => setData({ id, title, image, content })}
                    mr={3}>
                    Edit
                  </Button>
                  <Button colorScheme="red" variant="solid" onClick={() => handleRemove(id)}>
                    X
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {data && <BlogModal {...data} {...{ isLoading, onClose: handleClose, isOpen, onUpdate: handleUpdatePost }} />}
      <BlogModal
        {...{
          isLoading,
          onClose: onCloseNew,
          isOpen: isOpenNew,
          onCreate: handleCreatePost,
          isCreate: true,
        }}
      />
    </Fragment>
  );
};

export default BlogTable;
