import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Dashboard from "./dashboard";
import UsersPanel from "../pages/Users/UsersPanel";

export default function Sidebar() {
    const [step, setStep] = useState<string>("")
    const renderStep = () => {
        switch (step) {
            case 'dashboard':
                return <Dashboard />
            case 'users':
                return <UsersPanel />
            default:
                return <Dashboard />
        }
    }
    return (
        <Flex direction="row">
            <Flex bg="rgb(86, 73, 255)" height="100vh" width="15%" direction="column">
                <Flex p={10}>
                    <Text color="white" fontSize="20px">Admin Taxly</Text>
                </Flex>
                <Flex mt={15} p={4} direction="column" gap={4}>
                    <Text color="white" fontSize="16px" cursor="pointer" onClick={() => setStep("dashboard")}>Dashboard</Text>
                    <Text color="white" fontSize="16px" cursor="pointer" onClick={() => setStep("users")}>Usuários</Text>
                    <Text color="white" fontSize="16px" cursor="pointer" onClick={() => setStep("companies")}>Empresas</Text>
                </Flex>
            </Flex>
             {renderStep()}
        </Flex>

    )
}
