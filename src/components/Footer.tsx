import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Flex color="white" minH="270px" p={3} bg="secondary" justifyContent="center" alignItems="center" direction="column" >
            <Flex alignItems="center" gap="100px" flexWrap='wrap' justifyContent='center'>
                <Image src="/imgs/logo.png" w="80px" h="80px" />
                <Flex direction="column" fontFamily="Poppins-Regular">
                    <Text>Rua Manoel Amálio de Souza, 168</Text>
                    <Text>Frente, CEP 80820-560</Text>
                    <Text>Curitiba, PR</Text>
                </Flex>
                <Flex direction="column" fontFamily="Poppins-Regular">
                    <Text>CONTATO</Text>
                    <Text>email@ligareconstrutora.com.br</Text>
                    <Text>+55 (41) 3333-3333</Text>
                </Flex>
                <Flex direction="column" fontFamily="Poppins-Regular">
                    <Text>Redes Sociais</Text>
                </Flex>
            </Flex>
            <Text mt="50px" fontSize="12" fontFamily="Poppins-Thin">Ligare Construtora. Feito por: MRZ</Text>
        </Flex>
    )
}
