'use client'
import { Flex, Text, Image, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Galery from "@/components/admin/galery";
import Dashboard from "./dashboard";
import Home from "./admin/home";
import About from "./admin/about";
import { useValidation } from "@/_hooks/useValidate";
import Obras from "./admin/obras";
import Contacts from "./admin/contact";

const textLinks = [
    {
        name: "Galeria",
        image: "/icons/galery.svg"
    },
    {
        name: "Home",
        image: "/icons/home.svg"
    },
    {
        name: "Obras",
        image: "/icons/dashboard.svg"
    },
    {
        name: "Sobre nós",
        image: "/icons/dashboard.svg"
    },
    {
        name: "Contatos",
        image: "/icons/dashboard.svg"
    }
]

export default function Sidebar() {
    const [step, setStep] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const sysValidation = useValidation();

    const validateLogin = async () => {
        // eslint-disable-next-line  no-unused-vars
        await sysValidation(async (token: string) => {
            true;
        });
    }
    useEffect(() => {
        validateLogin();
    }, [])

    const renderStep = () => {
        switch (step) {
            case 'Galeria':
                return <Galery />
            case 'Home':
                return <Home />
            case 'Obras':
                return <Obras />
            case 'Sobre nós':
                return <About />
            case 'Contatos':
                return <Contacts />
            default:
                return <Dashboard />
        }
    }

    interface IMenuItemProps {
        onClick: any;
        img: string;
        title: string;
        small: boolean;
        selected: boolean;
        depth?: boolean;
    }

    const MenuItem = (props: IMenuItemProps) => {
        if (props.small) {
            if (props.selected) {
                return (
                    <Tooltip label={props.title}>
                        <Flex gap="8px" p="10px 30px" alignItems="center" backgroundColor="rgb(255,255,255,0.1)" _hover={{ cursor: "pointer", backgroundColor: 'rgb(255,255,255,0.1)', transition: '300ms' }} onClick={props.onClick}>
                            <Image w="22px" h="22px" src={props.img} />
                        </Flex>
                    </Tooltip>
                );
            } else {
                return (
                    <Tooltip label={props.title}>
                        <Flex gap="8px" p="10px 30px" alignItems="center" _hover={{ cursor: "pointer", backgroundColor: 'rgb(255,255,255,0.1)', transition: '300ms' }} onClick={props.onClick}>
                            <Image w="22px" h="22px" src={props.img} />
                        </Flex>
                    </Tooltip>
                );
            }
        } else {
            if (props.selected) {
                return (
                    <Flex gap='8px' marginLeft={props.depth ? '50px' : '0px'} p="10px 30px" alignItems="center" backgroundColor="rgb(255,255,255,0.1)" _hover={{ cursor: "pointer", backgroundColor: 'rgb(255,255,255,0.1)', transition: '300ms' }} onClick={props.onClick}>
                        {!props.depth ?
                            <Image w="22px" h="22px" src={props.img} />
                            : null
                        }
                        <Text fontSize="16px">{props.title}</Text>
                    </Flex>
                );
            } else {
                return (
                    <Flex gap='8px' marginLeft={props.depth ? '50px' : '0px'} p="10px 30px" alignItems="center" _hover={{ cursor: "pointer", backgroundColor: 'rgb(255,255,255,0.1)', transition: '300ms' }} onClick={props.onClick}>
                        {!props.depth ?
                            <Image w="22px" h="22px" src={props.img} />
                            : null
                        }
                        <Text fontSize="16px">{props.title}</Text>
                    </Flex>
                );
            }
        }
    }

    return (
        <>
            <Flex className="sidebar" fontFamily="Comfortaa-Medium">
                {isOpen ? (
                    <Flex id="teste" w="250px" bg="gray" color="white" justifyContent="center" transition="300ms" position="fixed" zIndex={99} left="0px" right="0px" top="0px" bottom="0px" boxShadow="14px 2px 24px -12px rgba(0, 0, 0, 0.32)">
                        <Flex direction="column" >
                            <Flex justifyContent="end" transition="300ms" marginTop="20px" w="284px" mt={2} onClick={() => setIsOpen(!isOpen)} _hover={{ cursor: "pointer" }}>
                                <Flex h={35} w={35} bg="#ecdb19" color="blackAlpha.600" borderRadius="100%" justifyContent="center" alignItems="center">
                                    <Image src="/icons/arrow-close.svg" h={15} w={15} />
                                </Flex>
                            </Flex>
                            <Flex direction="column" gap={8}>
                                <Flex justifyContent="center">
                                    <Text color="white" fontSize="32px" cursor="pointer" onClick={() => setStep('')}>Ligare</Text>
                                </Flex>
                            </Flex>
                            <Flex direction="column" mt={8}>
                                {textLinks.map((link: { name: string, image: string }, key: number) => {
                                    return <MenuItem key={key} selected={step === link.name} small={false} title={link.name} img={link.image} onClick={() => setStep(link.name)} />
                                })}

                            </Flex>
                        </Flex>
                    </Flex>) : (
                    <Flex w="90px" bg="gray" color="white" position="fixed" zIndex={99} left="0px" right="0px" top="0px" bottom="0px" transition="300ms" boxShadow="14px 2px 24px -12px rgba(0, 0, 0, 0.32)">
                        <Flex direction="column">
                            <Flex justifyContent="end" mt="10px" transition="300ms" w="104px" onClick={() => setIsOpen(!isOpen)} _hover={{ cursor: "pointer" }}>
                                <Flex h={35} w={35} bg="#ecdb19" borderRadius="100%" justifyContent="center" alignItems="center">
                                    <Image src="/icons/arrow-open.svg" h={15} w={15} />
                                </Flex>
                            </Flex>
                            <Flex direction="column">
                                <Flex justifyContent="center" ml="-20px">
                                    <Image src="/imgs/logo.png" h={50} w={50} onClick={() => setStep('')} borderRadius="50%" />
                                </Flex>
                            </Flex>
                            <Flex direction="column" w="90px" mt={8}>
                                {textLinks.map((link: { name: string, image: string }, key: number) => {
                                    return <MenuItem key={key} selected={step === link.name} small={true} title={link.name} img={link.image} onClick={() => setStep(link.name)} />
                                })}
                            </Flex>
                        </Flex>
                    </Flex>)}
            </Flex>

            {/* Pagina */}
            {
                isOpen ? (<Flex className="mainPage" flexGrow="1" flexShrink="1" transition="300ms" ml="290px">
                    {renderStep()}
                </Flex>) : (<Flex className="mainPage" flexGrow="1" flexShrink="1" transition="300ms" ml="130px">
                    {renderStep()}
                </Flex>)
            }
        </>

    )
}
