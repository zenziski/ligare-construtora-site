
import { postContact } from "@/_services/contact.service";
import Ligare from "@/components/Ligare";
import { Flex, FormLabel, Input, Text, Textarea, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
    const [data, setData] = useState<any>({
        name: '',
        phone: '',
        description: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    const save = async () => {
        setLoading(true);
        try {
            await postContact(data);
            toast({
                title: "Contato enviado com sucesso!",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: "Erro ao enviar contato!",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        setLoading(false);
    }

    const handleData = (e: any, key: string) => {
        setData({ ...data, [key]: e.target.value });
    }

    return (
        <Ligare image="/imgs/home1.jpg" title="Contato">
            <Flex mt="45px" mb="85px" pl={10} pr={10} gap={4} direction="column">
                <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize={isLargeScreen ? "64px" : "48px"} className="underline-text-heading-right">Contato</Text>
                <Flex flexFlow='wrap' gap={4}>
                    <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'}>
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Nome Completo</Text>
                        </FormLabel>
                        <Input value={data.name} fontFamily="Poppins-Regular" placeholder="Nome completo" onChange={(e) => handleData(e, 'name')} />
                    </Flex>
                    <Flex direction="column" gap={2} w={isLargeScreen ? "" : '100%'} >
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Telefone/Celular</Text>
                        </FormLabel>
                        <Input value={data.phone} fontFamily="Poppins-Regular" placeholder="Ex: (41) 99999-9999" onChange={(e) => handleData(e, 'phone')} />
                    </Flex>
                </Flex>
                <Flex flexFlow='wrap' gap={8} alignItems="center">
                    <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'}>
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Motivo do contato</Text>
                        </FormLabel>
                        <Textarea value={data.description} fontFamily="Poppins-Regular" onChange={(e) => handleData(e, 'description')} />
                    </Flex>
                    <Text fontSize="24px" cursor="pointer" fontFamily="Poppins-Medium" className="underline-text" onClick={() => {
                        if (!loading) {
                            save();
                        }
                    }}>Enviar</Text>
                </Flex>
            </Flex>

        </Ligare>
    )
}
