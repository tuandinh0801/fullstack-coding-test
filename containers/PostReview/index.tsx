import React, { Fragment, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import PostItem from "components/PostItem";
import BlogRepo from "repositories/blogs";
import PostModal from "components/PostModal";

type PostReviewProps = {
  blogId: string;
};

const PostReview: React.FC<PostReviewProps> = ({ blogId }) => {
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = BlogRepo.onPostData(blogId, setData);

    return () => {
      unsubscribe();
    };
  }, []);

  return data ? (
    <Fragment>
      <PostItem {...data} {...{ onOpen }} />
      <PostModal {...data} {...{ isOpen, onClose }} />
    </Fragment>
  ) : null;
};

export default PostReview;
