import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Logo from "components/ui/Logo";
import { useAuthenticate } from "hooks/auth/useAuthenticate";
import firebase from 'services/firebase'

const Header = () => {
  const { user } = useAuthenticate();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}>
      <Flex align="center">
        <Logo w="100px" color={["white", "white", "primary.500", "primary.500"]} />
      </Flex>
      {user && (
        <Button colorScheme="teal" variant="ghost" onClick={() => firebase.auth().signOut()}>
          Logout
        </Button>
      )}
    </Flex>
  );
};

export default Header;
