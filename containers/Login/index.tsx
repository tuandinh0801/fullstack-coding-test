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
import ErrorMessage from "components/ui/ErrorMessage";
import { useAuthenticate } from "hooks/auth/useAuthenticate";

const Login = () => {
  const { login } = useAuthenticate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        await login({ email, password });
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
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} align="center" />}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" size="lg" name="email" onChange={handleChangeEmail} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" size="lg" onChange={handleChangePassword} />
            </FormControl>
            <Button variant="outline" type="submit" width="full" mt={4} disabled={isLoading}>
              {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Log me in"}
            </Button>
          </form>
          <Link href="/sign-up">
            <LinkUI>
              <Text align="center" mt={4}>
                Don&apos;t have account? Sign up
              </Text>
            </LinkUI>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
