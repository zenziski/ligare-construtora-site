import { createSlug } from "@/utils/createSlug";
import { Box, Flex, Image, Link, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const HeaderMenu = ({ location, padding }: { location: string, padding: string }) => {
    return (
        <Flex h="30px" zIndex={4} pr={padding}>
            <Link href={`/${createSlug(location)}`}>
                <Text fontSize="18px" fontFamily="Poppins-Medium" className="underline-animation" cursor="pointer" color="white">{location}</Text>
            </Link>
        </Flex >
    )
}

export default function Header(props: { image: string }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Defina o ponto de interrupção para dispositivos móveis conforme necessário
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const imageSize = !isMobile ? "350px" : "200px"
    return (
        <Flex
            pl={0}
            m={0} w="100%"
            direction="row"
            justifyContent="space-around"
            height="60vh" p={10}
            bg={`url('${props.image}')`} backgroundSize={isMobile ? "cover" : "100%"} backgroundPosition="center" backgroundRepeat="no-repeat"
            transition="background 0.5s ease"
        >
            <Flex mt="50px"
                h={imageSize}
                borderRadius="5px"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                backdropFilter='blur(8px)'
            >
                <Image src="/imgs/logo_text.png" w={imageSize} h={imageSize} />
            </Flex>
            {/* menu */}
            {
                isMobile ? (
                    <>
                        <IconButton
                            aria-label="Abrir Menu"
                            icon={<HamburgerIcon width="40px"
                                height="40px" />}
                            onClick={onOpen}
                            color='white'
                            variant='ghost'
                            size='lg'
                            display={isOpen ? 'none' : ''}
                            position="absolute"
                            left="85%"

                        />
                        <Box
                            pos='fixed'
                            top={0}
                            bottom={0}
                            right={0}
                            bg="rgba(0, 0, 0, 0.8)"
                            w={isOpen ? "100%" : 0}
                            transition="width 0.3s"
                            zIndex={999}
                            overflow="hidden"
                            display={{ base: "block", md: "none" }}
                        >
                            <IconButton
                                aria-label="Fechar menu"
                                icon={<CloseIcon />}
                                onClick={onClose}
                                color="white"
                                variant="ghost"
                                alignSelf="flex-end"
                            />
                            <Flex
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                gap={10}
                                p={6}
                                mt="-250px"
                                h="100vh"
                            >
                                <HeaderMenu padding="0" location="Home" />
                                <HeaderMenu padding="0" location="Obras" />
                                <HeaderMenu padding="0" location="Sobre nós" />
                                <HeaderMenu padding="0" location="Contato" />
                            </Flex>
                        </Box>
                    </>
                ) : (
                    <Flex
                        pos='absolute'
                        right='0'
                        alignItems="center"
                        justifyContent="center"
                        gap={10} p={6}
                        h="40px"
                        background="rgba(255, 255, 255, 0.2)"
                        borderRadius="5px 0px 0px 5px"
                        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                        backdropFilter="blur(6px)"
                    >
                        <HeaderMenu padding="0" location="Home" />
                        <HeaderMenu padding="0" location="Obras" />
                        <HeaderMenu padding="0" location="Sobre nós" />
                        <HeaderMenu padding="80px" location="Contato" />
                    </Flex>
                )
            }
        </Flex>
    )
}
