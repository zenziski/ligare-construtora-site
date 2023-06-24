import { postLogin } from "@/_services/auth.service";
import { Flex, Card, CardHeader, CardBody, Heading, Input, Button, useToast, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router'
import MiniLoading from "./miniLoading";

interface ILogin {
  email: string
  password: string
}

export default function Login() {
  const [loginData, setLoginData] = useState<ILogin>({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const toast = useToast();

  const handleChange = (key: string, value: string) => {
    setLoginData({ ...loginData, [key]: value })
  }

  const handleLogin = async () => {

    if (!loginData.email || !loginData.password) {
      toast({
        title: 'Email e senha obrigatórios',
        description: `Email e senha obrigatórios`,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    }
    setIsLoading(true);
    const response = await postLogin(loginData);
    if (response.token) {
      setCookie("token", response.token, { path: "/", sameSite: "lax" });
      router.push('/admin/dashboard');
    } else {
      toast({
        title: 'Email ou senha incorretos',
        description: `Email ou senha incorretos`,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (cookies.token) {
      router.push('/admin/dashboard')
    }
  }, [])
  return (
    <Flex direction="row">
      <Flex bg="gray.500" height={{ base: '0vh', md: '100vh' }} width={{ base: '0', md: '70%' }} flexDirection='column' justifyContent='center' alignItems='center'>
        <Image display={{ base: "none", md: "block" }} mb={3} src='../imgs/verso.jpeg' width='200px' height='200px' borderRadius='40px' objectFit='cover' />
        <Text fontWeight='bold'>LIGARE CONSTRUTORA</Text>
      </Flex>

      <Flex justifyContent="center" alignItems="center" flexDirection='column' width={{ base: '100%', md: '30%' }} height={{ base: '100vh' }} >

        <Image display={{ base: "block", md: "none" }} mb={3} src='../imgs/verso.jpeg' width='200px' height='200px' borderRadius='40px' objectFit='cover' />

        <Card>
          <CardHeader>
            <Heading size='md'>Login</Heading>
          </CardHeader>
          <CardBody>
            <Flex direction="column" alignItems="center" gap={4}>
              <Input type="email" placeholder="Email" onChange={(e: any) => handleChange("email", e.target.value)}></Input>
              <Input type="password" placeholder="Senha" onChange={(e: any) => handleChange("password", e.target.value)}></Input>
              <Button width="50%" colorScheme='yellow' isDisabled={isLoading} onClick={() => handleLogin()}>Login {isLoading ? <MiniLoading size={22} color="gray" /> : null} </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  )
}