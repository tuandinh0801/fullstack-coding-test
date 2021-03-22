import React, { useCallback, useState } from "react";
import {
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
  FormControl,
  FormLabel,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type BlogModalProps = {
  image?: string;
  title?: string;
  content?: string;
  isLoading: boolean;
  isOpen: boolean;
  isCreate?: boolean;
  onClose: () => void;
  onUpdate?: (blogData: BlogData) => void;
  onCreate?: (blogData: BlogData) => void;
};

type BlogData = {
  image: any;
  title: string;
  content: string;
  imagePreview: any;
};

const BlogModal: React.FC<BlogModalProps> = ({
  isLoading,
  isOpen,
  onClose,
  title = "",
  image = "",
  content = "",
  onUpdate,
  onCreate,
  isCreate,
}) => {
  const [formData, setFormData] = useState<BlogData>({
    title,
    image,
    content,
    imagePreview: image,
  });

  const handleChangeTitle = useCallback(
    (e) => {
      setFormData((data) => ({ ...data, title: e.target.value }));
    },
    [setFormData]
  );

  const handleChangeImage = useCallback(
    (e) => {
      if (e.target.files.length) {
        const reader = new FileReader();

        reader.onload = function (event) {
          setFormData((data) => ({ ...data, imagePreview: event.target.result }));
        };

        reader.readAsDataURL(e.target.files[0]);

        setFormData((data) => ({ ...data, image: e.target.files[0] }));
      }
    },
    [setFormData]
  );

  const handleChangeContent = useCallback(
    (_, editor) => {
      const content = editor.getData();
      setFormData((data) => ({ ...data, content }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      isCreate ? await onCreate(formData) : await onUpdate(formData);
      setFormData({
        title: "",
        image: "",
        content: "",
        imagePreview: "",
      })
    },
    [formData]
  );

  return (
    <Modal size="xl" scrollBehavior="inside" isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isCreate ? "Create Blog" : "Edit Blog"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={4} textAlign="left">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="title"
                  size="lg"
                  name="title"
                  value={formData.title}
                  onChange={handleChangeTitle}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  placeholder="blog image"
                  size="lg"
                  name="image"
                  onChange={handleChangeImage}
                />
                <Image src={formData.imagePreview} height={50}></Image>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Content</FormLabel>
                <CKEditor editor={ClassicEditor} data={formData.content} onChange={handleChangeContent} />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" type="submit" mr={3} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : isCreate ? (
                "Create"
              ) : (
                "Update"
              )}
            </Button>

            <Button variant="ghost" colorScheme="teal" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default BlogModal;
