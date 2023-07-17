import { createSlug } from "@/utils/createSlug";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";

const HeaderMenu = ({ location }: { location: string }) => {
    return (
        <Flex h="30px" zIndex={4}>
            <Link href={`/${createSlug(location)}`}>
                <Text fontFamily="Poppins-Medium" className="underline-animation" cursor="pointer" color="white">{location}</Text>
            </Link>
        </Flex >
    )
}

export default function Header(props: { image: string }) {

    return (
        <Flex
            pl={0}
            m={0} w="100%"
            direction="row"
            justifyContent="space-between"
            height="100vh" p={10}
            bg={`url(${props.image})`} backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat"
            transition="background 0.5s ease"
        >
            <Flex>
                <Image src="/imgs/logo.png" w="70px" h="70px" />
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="center"
                gap={10} p={6}
                h="40px"
                background="rgba(255, 255, 255, 0.2)" borderRadius="5px" boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" backdropFilter="blur(6px)"
            >
                <HeaderMenu location="Home" />
                <HeaderMenu location="Projetos" />
                <HeaderMenu location="Sobre nós" />
                <HeaderMenu location="Contato" />
            </Flex>
        </Flex>
    )
}
