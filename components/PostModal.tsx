import React from "react";
import {
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type PostModalProps = {
  image: string;
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
};

const PostModal: React.FC<PostModalProps> = ({ image, title, content, isOpen, onClose }) => {
  return (
    <Modal size="xl" scrollBehavior="inside" isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box role="group" height="260px" width="100%" pos="relative">
            <Box
              as={Image}
              width="1200"
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
            <Box
              my="20px"
              flex="1"
              color="gray.700"
              dangerouslySetInnerHTML={{
                __html: content,
              }}></Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
