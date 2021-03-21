import React, { useCallback, useMemo, useState } from "react";
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link as LinkUI,
  CircularProgress,
} from "@chakra-ui/react";
import Link from "next/link";
import ErrorMessage from "components/ui/ErrorMessage";
import { useAuthenticate } from "hooks/auth/useAuthenticate";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter()
  const { signUp } = useAuthenticate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    dateOfBirth: "",
    password: "",
    confirm: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);

  const checkError = useMemo(() => {
    if (formData.password !== formData.confirm) return "Confirm password does not match password";

    return false;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setError(null);
      if (checkError) return setError(checkError);
      setLoading(true);

      try {
        await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
        });

        router.push('/login')
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [formData]
  );

  return (
    <Container w="xl" width="full" align="center" justifyContent="center">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Sign up</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} align="center" />}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" size="lg" name="email" onChange={handleChangeForm} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Bill" size="lg" name="name" onChange={handleChangeForm} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Date of birth</FormLabel>
              <Input type="date" placeholder="01/01/1991" size="lg" name="dateOfBirth" onChange={handleChangeForm} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" size="lg" name="password" onChange={handleChangeForm} />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="*******" size="lg" name="confirm" onChange={handleChangeForm} />
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
