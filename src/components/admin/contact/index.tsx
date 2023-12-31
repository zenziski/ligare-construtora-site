import { useState, useEffect } from "react"
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Wrapper } from "@/components/wrapper";
import { useValidation } from "@/_hooks/useValidate";
import { getContacts } from "@/_services/contact.service";
import MiniLoading from "@/components/miniLoading";
import EditContactImage from "./modais/EditContactImage";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const sysValidation = useValidation()

    const fetchData = async () => {
        try {
            await sysValidation(async (token: string) => {
                const response = await getContacts(token)
                setContacts(response)
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        contacts.length ? <Wrapper title="Contatos">
            <EditContactImage />
            <Flex padding={2} flexDirection='column' gap={4}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Telefone</Th>
                            <Th>Email</Th>
                            <Th>Descrição</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contacts.map((item: any) => {
                            return (
                                <Tr key={item._id}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.phone}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.description}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Flex>
        </Wrapper> :
            <Flex justifyContent="center" w="100%" h="100%" alignItems="center">
                <MiniLoading />
            </Flex>
    )
}
