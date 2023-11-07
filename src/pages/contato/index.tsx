
import { postContact } from "@/_services/contact.service";
import Ligare from "@/components/Ligare";
import { Flex, FormLabel, Input, Text, Textarea, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
    const [data, setData] = useState<any>({
        name: '',
        phone: '',
        email: '',
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
        <Ligare image="/imgs/home1.jpg" title="Contato" text="ENTRE EM CONTATO" page="contato">
            <Flex mt="45px" mb="85px" pl={10} pr={10} gap={4} direction="column">
                <Flex gap={4} direction="column">
                    <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'}>
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">SEU NOME</Text>
                        </FormLabel>
                        <Input value={data.name} fontFamily="Poppins-Regular" placeholder="SEU NOME" onChange={(e) => handleData(e, 'name')} />
                    </Flex>
                    <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'} >
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">TELEFONE</Text>
                        </FormLabel>
                        <Input value={data.phone} fontFamily="Poppins-Regular" placeholder="TELEFONE" onChange={(e) => handleData(e, 'phone')} />
                    </Flex>
                    <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'} >
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">E-MAIL</Text>
                        </FormLabel>
                        <Input value={data.email} fontFamily="Poppins-Regular" placeholder="E-MAIL" onChange={(e) => handleData(e, 'email')} />
                    </Flex>
                </Flex>

                <Flex direction="column" gap={2} w={isLargeScreen ? "50%" : '100%'}>
                    <FormLabel>
                        <Text fontFamily="Poppins-Medium">E AÍ, NO QUE PODEMOS TE AJUDAR?</Text>
                        <Text fontFamily="Poppins-Medium">SE JÁ TIVER PROJETOS, POR FAVOR, NOS ENVIE</Text>
                    </FormLabel>
                    <Textarea value={data.description} fontFamily="Poppins-Regular" onChange={(e) => handleData(e, 'description')} />
                </Flex>
                <Text w={isLargeScreen ? "50%" : '100%'} fontSize="24px" cursor="pointer" fontFamily="Poppins-Medium" className="underline-text" onClick={() => {
                    if (!loading) {
                        save();
                    }
                }}>Enviar</Text>

            </Flex>

        </Ligare>
    )
}
