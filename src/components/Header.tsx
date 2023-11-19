import { createSlug } from "@/utils/createSlug";
import { Box, Flex, Link, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const HeaderMenu = ({ location, isMobile }: { location: string, isMobile: boolean }) => {
    return (
        <Flex h="40px" zIndex={4}>
            <Link href={`/${location == "Sobre nós" ? "#sobre-nos" : createSlug(location)}`}>
                <Text fontSize="24px" fontFamily="Oswald-Regular" className="underline-animation" cursor="pointer" color={isMobile ? "white" : "black"}>{location}</Text>
            </Link>
        </Flex >
    )
}
type Props = {
    image: string,
    text: string,
    page: string
}
export default function Header(props: Props) {

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

    const logoProps = {
        color: "white",
        fontFamily: "Oswald-Bold",
        /* fontSize: props.page === "home" && isMobile
            ? "140px"
            : props.page === "home" && !isMobile
                ? "550px"
                : props.page === "obras" && isMobile
                    ? "90px"
                    : isMobile
                        ? "120px"
                        : calculateFontSize(props.text), */
        fontSize: props.page === "home" ? "30vw" : "10vw",
        lineHeight: props.page === "home" && !isMobile
            ? "65%"
            : props.page === "home" && isMobile
                ? "20%"
                : "40%",
        opacity: 1,
    }


    return (
        <Flex
            pl={0}
            m={0} w="100%"
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            height={isMobile ? "30vh" : "100vh"} p={10}
            bg={`url('${props.image}')`} backgroundSize="cover" backgroundPosition="center top" backgroundRepeat="no-repeat"
        >
            {/* logo */}
            <Text
                {...logoProps}
            >
                {props.text}
            </Text>
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
                            top="15px"
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
                                <HeaderMenu isMobile={isMobile} location="Home" />
                                <HeaderMenu isMobile={isMobile} location="Obras" />
                                <HeaderMenu isMobile={isMobile} location="Sobre nós" />
                                <HeaderMenu isMobile={isMobile} location="Contato" />
                            </Flex>
                        </Box>
                    </>
                ) : (
                    <Flex
                        pos='absolute'
                        top={20}
                        right={20}
                        alignItems="center"
                        justifyContent="center"
                        gap={10} p={6}
                        h="40px"
                        background="rgba(255, 255, 255, 0.2)"
                        borderRadius="20px"
                        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                        backdropFilter="blur(6px)"
                    >
                        <HeaderMenu isMobile={isMobile} location="Home" />
                        <HeaderMenu isMobile={isMobile} location="Obras" />
                        <HeaderMenu isMobile={isMobile} location="Sobre nós" />
                        <HeaderMenu isMobile={isMobile} location="Contato" />
                    </Flex>
                )
            }
        </Flex>
    )
}
