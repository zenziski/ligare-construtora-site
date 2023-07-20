import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Flex color="white" minH="270px" p={3} bg="secondary" justifyContent="center" alignItems="center" direction="column" >
            <Flex alignItems="center" gap="50px" flexWrap='wrap' justifyContent='center'>
                <Image src="/imgs/logo_no_bg.png" w="250x" h="250px" />
                <Flex direction="column" fontFamily="Poppins-Regular">
                    <Text>Rua Padre Anchieta, 302</Text>
                    <Text>Sobreloja, Mercês</Text>
                    <Text>Curitiba, PR</Text>
                </Flex>
                <Flex direction="column" fontFamily="Poppins-Regular" alignItems="center">
                    <Text>CONTATO</Text>
                    <Text>ligare@ligareconstrutora.com.br</Text>
                    <Text>+55 (41) 3333-3333</Text>
                </Flex>
                <Flex direction="column" fontFamily="Poppins-Regular" gap={1}>
                    <Text>REDES SOCIAIS</Text>
                    <Link href="https://www.instagram.com/relaxa.estamos.emobras/">
                        <Image h="30px" src="/icons/instagram.svg" />
                    </Link>
                </Flex>
            </Flex>
            <Text mt="50px" fontSize="12" fontFamily="Poppins-Thin">Ligare Construtora. Feito por: MRZ</Text>
        </Flex>
    )
}
