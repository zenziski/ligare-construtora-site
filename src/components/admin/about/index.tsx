
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Button, useToast, Image, FormLabel, Textarea } from "@chakra-ui/react"
import SelectImages from "../home/modais/SelectImages"
import { useEffect, useState } from "react";
import { useValidation } from '@/_hooks/useValidate';
import { getAbout, postAbout } from "@/_services/aboutus.service";

export default function Home() {
    const toast = useToast();
    const sysValidation = useValidation();
    const [imagemPrincipal, setImagemPrincipal] = useState<string>("")
    const [whoWeAre, setWhoWeAre] = useState<string>("")
    const [team, setTeam] = useState<string>("")

    const getData = async () => {
        const response = await getAbout();
        setImagemPrincipal(response.imagemPrincipal)
        setWhoWeAre(response.whoWeAre)
        setTeam(response.team)
    }

    const handleSave = async () => {
        await sysValidation(async (token: string) => {
            const response = await postAbout({ imagemPrincipal, whoWeAre, team }, token);
            if (response) {
                toast({
                    title: "Dados salvos com sucesso",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Erro ao salvar os dados",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Wrapper title="Home">
            <Flex mt={4} width='100%' direction="column" p={2}>
                <Flex direction="column" w="100%">
                    <Flex direction="column" alignItems="center" gap={2}>
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Imagem Principal</Text>
                        </FormLabel>
                        <SelectImages setImage={setImagemPrincipal} />
                        <Image w="60%" h="500px" src={imagemPrincipal} />
                    </Flex>
                </Flex>
                <Flex direction="column" w="100%" p={2}>
                    <Flex direction="row" gap={2} p={4}>
                        <Flex direction="column" w='50%'>
                            <FormLabel>
                                <Text fontFamily="Poppins-Medium">Quem somos</Text>
                            </FormLabel>
                            <Textarea value={whoWeAre} onChange={(e) => setWhoWeAre(e.currentTarget.value)} />
                        </Flex>
                        <Flex direction="column" w='50%'>
                            <FormLabel>
                                <Text fontFamily="Poppins-Medium">Equipe</Text>
                            </FormLabel>
                            <Textarea value={team} onChange={(e) => setTeam(e.currentTarget.value)} />
                        </Flex>
                    </Flex>
                    <Flex mt={3}>
                        <Button bgColor="primary" onClick={() => handleSave()} >Salvar</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Wrapper>
    )
}