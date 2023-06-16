import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Carrosel from "@/pages/admin/carrosel";
import Dashboard from "./dashboard";
import UsersPanel from "../pages/Users/UsersPanel";

const textLinks = ['Carrosel', 'Quem somos', 'Serviços']

export default function Sidebar() {
    const [step, setStep] = useState<string>("")
    const renderStep = () => {
        switch (step) {
            case 'Carrosel':
                return <Carrosel />
            default:
                return <Dashboard />
        }
    }

    const LinkText = (text: string) => {
        return (
            <Text p={2} transition={'background-color 0.3s ease'} _hover={{ bgColor: '#ecdb19' }} color="black" fontWeight='semibold' fontSize="16px" cursor="pointer" onClick={() => setStep(text)}>
                {text}
            </Text>
        )
    }

    return (
        <Flex direction="row">
            <Flex bg='blackAlpha.600' height="100vh" width="15%" minWidth='180px' direction="column">
                <Flex p={10}>
                    <Text color="black" fontWeight='bold' fontSize="20px">Ligare Admin</Text>
                </Flex>
                <Flex mt={15} direction="column" gap={1}>
                    {
                        textLinks.map((element: any) => {
                            return (
                                LinkText(element)
                            )
                        })
                    }
                </Flex>
            </Flex>
            {renderStep()}
        </Flex>

    )
}
