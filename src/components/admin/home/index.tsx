
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Divider, Card, CardBody, Input, Button, useToast, Image, Box, Stack, FormControl, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react"
import SelectImages from "./modais/SelectImages"
import { useEffect, useState } from "react";
import { useValidation } from '@/_hooks/useValidate';
import { postHomeData, getDataHome } from "@/_services/home.service";

export default function Home() {
    const [description, setDescription] = useState<string>('');
    const [reforma, setReforma] = useState<any>(null);
    const [construcao, setConstrucao] = useState<any>(null);
    const [projeto, setProjeto] = useState<any>(null);
    const [imagemPrincipal, setImagemPrincipal] = useState<string>('');
    const toast = useToast();
    const sysValidation = useValidation();

    const getData = async () => {
        const response = await getDataHome();
        console.log(response);
        setDescription(response.description);
        setReforma(response.reform);
        setConstrucao(response.construction);
        setProjeto(response.project);
        setImagemPrincipal(response.imagemPrincipal);
    }

    const setReformaName = (name: string) => {
        setReforma({ ...reforma, name: name });
    }
    const setReformaImage = (image: string) => {
        setReforma({ ...reforma, image: image });
    }
    const setConstrucaoName = (name: string) => {
        setConstrucao({ ...construcao, name: name });
    }
    const setConstrucaoImage = (image: string) => {
        setConstrucao({ ...construcao, image: image });
    }
    const setProjetoName = (name: string) => {
        setProjeto({ ...projeto, name: name });
    }
    const setProjetoImage = (image: string) => {
        setProjeto({ ...projeto, image: image });
    }

    const handleSave = async () => {
        const data = {
            description: description,
            reforma: reforma,
            construcao: construcao,
            projeto: projeto,
            imagemPrincipal: imagemPrincipal
        }
        console.log(data)
        await sysValidation(async (token: string) => {
            postHomeData(data, token).then(() => {
                toast({
                    title: "Dados salvos com sucesso!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            }).catch(() => {
                toast({
                    title: "Erro ao salvar os dados!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            })
        })
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <Wrapper title="Home">
            <Flex mt={4} width='100%' >
                <Flex direction="column" w="100%">
                    <Flex direction="column" alignItems="center" gap={2}>
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Imagem Principal</Text>
                        </FormLabel>
                        <SelectImages setImage={setImagemPrincipal} />
                        <Image w="80%" h="800px" src={imagemPrincipal} />
                    </Flex>
                    <Flex direction="column" w="100%">
                        <FormLabel>
                            <Text fontFamily="Poppins-Medium">Descrição</Text>
                        </FormLabel>
                        <Textarea placeholder="Descrição" value={description} onChange={text => setDescription(text.target.value)} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex mt={30} justifyContent="space-around">
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={1}>
                    <Text fontSize="18px" fontFamily="Poppins-Medium">Reforma</Text>
                    <SelectImages setImage={setReformaImage} />
                    <Image w="250px" h="250px" src={reforma?.image} />
                    <Input value={reforma?.name} onChange={(e) => setReformaName(e.target.value)} placeholder="Título" w="250px" />
                </Flex>
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={2}>
                    <Text fontSize="18px" fontFamily="Poppins-Medium">Construção</Text>
                    <SelectImages setImage={setConstrucaoImage} />
                    <Image w="250px" h="250px" src={construcao?.image} />
                    <Input value={construcao?.name} onChange={(e) => setConstrucaoName(e.target.value)} placeholder="Título" w="250px" />
                </Flex>
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={3}>
                    <Text fontSize="18px" fontFamily="Poppins-Medium">Projeto</Text>
                    <SelectImages setImage={setProjetoImage} />
                    <Image w="250px" h="250px" src={projeto?.image} />
                    <Input value={projeto?.name} onChange={(e) => setProjetoName(e.target.value)} placeholder="Título" w="250px" />
                </Flex>
            </Flex>
            <Flex mt={3}>
                <Button onClick={() => handleSave()} >Salvar</Button>
            </Flex>
        </Wrapper>
    )
}