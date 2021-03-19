import React, { useCallback, useState } from "react";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Text,
  Link as LinkUI,
  CircularProgress,
} from "@chakra-ui/react";
import Link from "next/link";
import firebase from "services/firebase";
import ErrorMessage from "components/ui/ErrorMessage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [email, password]
  );

  return (
    <Container w="xl" width="full" align="center" justifyContent="center">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} align="center"/>}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" size="lg" name="email" onChange={handleChangeEmail} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" size="lg" onChange={handleChangePassword} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="*******" size="lg" onChange={handleChangeConfirmPassword} />
            </FormControl>
            <Button variant="outline" type="submit" width="full" mt={4} disabled={isLoading}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Sign up"}
            </Button>
          </form>
          <Link href="/">
            <LinkUI>
              <Text align="center" mt={4}>
                Already have account? Sign in
              </Text>
            </LinkUI>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
