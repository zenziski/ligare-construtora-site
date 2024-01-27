import { Flex, Image, Link, Text } from "@chakra-ui/react";

export default function FooterObras() {
    return (
        <Flex color="white" minH="270px" p={3} bg="black" direction="column">
            <Flex gap="50px" flexWrap='wrap' alignItems={'center'} fontWeight={'bold'} fontSize={'1.8rem'}>
                <Image src="/imgs/logo_branco.webp" w="250x" h="250px" />
                <Flex direction="column" >
                    <Text>um pouco de humor</Text>
                    <Text>um pouco de drama</Text>
                    <Text>e muito pó</Text>
                    <Flex direction="column">
                        <Flex alignItems={'center'}>
                            <Link href="https://www.instagram.com/relaxa.estamosemobras/">
                                <Image h="43px" src="/icons/instagram.svg" mr={2}/>
                            </Link>
                            <Text>siga a gente nas redes sociais</Text>
                        </Flex>
                        <Link href="https://www.instagram.com/relaxa.estamosemobras/">
                            <Text>@relaxa.estamosemobras</Text>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent={"center"}>
                <Text mt="50px" fontSize="12" fontFamily="Poppins-Thin">Ligare Construtora. Feito por: MRZ</Text>
            </Flex>
        </Flex>
    )
}