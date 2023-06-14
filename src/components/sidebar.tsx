import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Carrosel from "@/pages/admin/carrosel";
import Dashboard from "./dashboard";
import UsersPanel from "../pages/Users/UsersPanel";

export default function Sidebar() {
    const [step, setStep] = useState<string>("")
    const renderStep = () => {
        switch (step) {
            case 'carrosel':
                return <Carrosel />
            default:
                return <Dashboard />
        }
    }
    return (
        <Flex direction="row">
            <Flex bg='yellow.400' height="100vh" width="15%" minWidth='180px' direction="column">
                <Flex p={10}>
                    <Text color="black" fontSize="20px">Ligare Admin</Text>
                </Flex>
                <Flex mt={15} p={4} direction="column" gap={4}>
                    <Text color="black" fontSize="16px" cursor="pointer" onClick={() => setStep("carrosel")}>Carrosel</Text>
                    <Text color="black" fontSize="16px" cursor="pointer" onClick={() => setStep("users")}>Quem somos</Text>
                    <Text color="black" fontSize="16px" cursor="pointer" onClick={() => setStep("companies")}>Serviços</Text>
                </Flex>
            </Flex>
            {renderStep()}
        </Flex>

    )
}
