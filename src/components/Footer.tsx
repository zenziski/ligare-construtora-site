import { Flex, Image, Link, Text } from "@chakra-ui/react";
import FooterObras from "./FooterObras";

type Props = {
    title: string
}

export default function Footer(props: Props) {
    return (
        <>
            {props.title === 'Contato' || props.title === 'Página Inicial' ? (
                <Flex color="white" minH="270px" p={3} bg="black" justifyContent="center" alignItems="center" direction="column" >
                    <Flex alignItems="center" gap="50px" flexWrap='wrap' justifyContent='center'>
                        <Image src="/imgs/logo_no_bg.png" w="250x" h="250px" />
                        <Flex direction="column" fontFamily="Poppins-Regular">
                            <Image src='/icons/location.svg' h="43px" mb={1} />
                            <Text>Rua Padre Anchieta, 302</Text>
                            <Text>Mercês - Curitiba, PR</Text>
                        </Flex>
                        <Flex direction="column" fontFamily="Poppins-Regular" alignItems="center">
                            <Image src="/icons/conversation.png" h='43px' />
                            <Text>ligare@ligareconstrutora.com.br</Text>
                            <Text>+55 (41) 3333-3333</Text>
                        </Flex>
                        <Flex direction="column" fontFamily="Poppins-Regular" gap={1} justifyContent={'center'} alignItems={'center'}>
                            <Link href="https://www.instagram.com/relaxa.estamos.emobras/">
                                <Image h="43px" src="/icons/instagram.svg" />
                            </Link>
                            <Text>@relaxa.estamos.emobras</Text>
                        </Flex>
                    </Flex>
                    <Text mt="50px" fontSize="12" fontFamily="Poppins-Thin">Ligare Construtora. Feito por: MRZ</Text>
                </Flex>
            ) : (
                <FooterObras />
            )}

        </>

    )
}
