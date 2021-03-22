import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import BlogTable from "containers/BlogTable";

const Dashboard = () => {
  return (
    <Box bg="accent.50" as="section" py={{ base: "24px", md: "40px" }} >
      <Box px={{ base: "24px", md: "40px" }} width={{ base: "auto", lg: "80%" }} maxWidth="1200px" mx="auto">
        <Heading textTransform="uppercase" textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} color="accent.400">
          Blog management
        </Heading>

        <BlogTable />
      </Box>
    </Box>
  );
};

export default Dashboard;
