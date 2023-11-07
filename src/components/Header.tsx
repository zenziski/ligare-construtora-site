import { createSlug } from "@/utils/createSlug";
import { Box, Flex, Link, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const HeaderMenu = ({ location }: { location: string }) => {
    return (
        <Flex h="40px" zIndex={4}>
            <Link href={`/${location == "Sobre nós" ? "#sobre-nos" : createSlug(location)}`}>
                <Text fontSize="24px" fontFamily="Oswald-Regular" className="underline-animation" cursor="pointer" color="black">{location}</Text>
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
    const calculateFontSize = (text: string) => {
        const minLengthForMaxFontSize = 10;
        const textLength = text.length;
        // You can adjust these values to fit your specific requirements
        const minFontSize = 150; // Minimum font size
        const maxFontSize = 150; // Maximum font size

        // Calculate font size based on text length
        const fontSize =
            textLength <= minLengthForMaxFontSize
                ? minFontSize
                : minFontSize + (maxFontSize - minFontSize) * (textLength / minLengthForMaxFontSize);

        return fontSize;
    };
    const logoProps = {
        color: ["obras", "obra"].includes(props.page) ? "gray.200" : "white",
        fontFamily: "Oswald-Bold",
        fontSize: isMobile ?
            "120px" :
            props.page === "home" ? "500px" : calculateFontSize(props.text),
        lineHeight: isMobile ? "300%" : (["obras", "obra"].includes(props.page) ? "48%" : "1"),
        opacity: ["obras", "obra"].includes(props.page) ? "0.8" : "1",
    }


    return (
        <Flex
            pl={0}
            m={0} w="100%"
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            height="80vh" p={10}
            bg={`url('${props.image}')`} backgroundSize={"cover"} backgroundPosition="center" backgroundRepeat="no-repeat"
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
                                <HeaderMenu location="Home" />
                                <HeaderMenu location="Obras" />
                                <HeaderMenu location="Sobre nós" />
                                <HeaderMenu location="Contato" />
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
                        <HeaderMenu location="Home" />
                        <HeaderMenu location="Obras" />
                        <HeaderMenu location="Sobre nós" />
                        <HeaderMenu location="Contato" />
                    </Flex>
                )
            }
        </Flex>
    )
}
