
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Button, useToast, Image, FormLabel, Textarea, Select } from "@chakra-ui/react"
import SelectImages from "./modais/SelectImages"
import { useEffect, useState } from "react";
import { useValidation } from '@/_hooks/useValidate';
import { postHomeData, getDataHome } from "@/_services/home.service";
import { getObras } from "@/_services/obras.service";

export default function Home() {
    const [description, setDescription] = useState<string>('');
    const [reforma, setReforma] = useState<any>(null);
    const [construcao, setConstrucao] = useState<any>(null);
    const [projeto, setProjeto] = useState<any>(null);
    const [obras, setObras] = useState<any[]>([])
    const [imagemPrincipal, setImagemPrincipal] = useState<string>('');
    const toast = useToast();
    const sysValidation = useValidation();

    const getData = async () => {
        const obras = await getObras();
        setObras(obras);
        const response = await getDataHome();
        setDescription(response.description);
        setReforma(response.reform);
        setConstrucao(response.construction);
        setProjeto(response.project);
        setImagemPrincipal(response.imagemPrincipal);
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

    useEffect(() => {
        console.log(reforma, construcao, projeto);
    }, [reforma, construcao, projeto])
    return (
        reforma && construcao && projeto && <Wrapper title="Home">
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
            <Flex mt={30} justifyContent="space-around" gap={4}>
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={1}>
                    <Text fontFamily="Poppins-Medium" fontSize="18px">Reforma</Text>
                    <Select value={reforma._id} onChange={(e) => setReforma(e.currentTarget.value)}>
                        <option value="64b87095c2b4169134de5e8a">Selecione um vinculo (opcional)</option>
                        {obras.filter((obra) => obra.type === 'reforma').map((obra) => {
                            return (
                                <option value={`${obra._id}`}>{obra.name}</option>
                            )
                        }
                        )}
                    </Select>
                </Flex>
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={1}>
                    <Text fontFamily="Poppins-Medium" fontSize="18px">Construção</Text>
                    <Select value={construcao._id} onChange={(e) => setConstrucao(e.currentTarget.value)}>
                        <option value="64b87095c2b4169134de5e8a">Selecione um vinculo (opcional)</option>
                        {obras.filter((obra) => obra.type === 'construcao').map((obra) => {
                            return (
                                <option value={`${obra._id}`}>{obra.name}</option>
                            )
                        }
                        )}
                    </Select>
                </Flex>
                <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="100%" gap={4} key={1}>
                    <Text fontFamily="Poppins-Medium" fontSize="18px">Projeto</Text>
                    <Select value={projeto._id} onChange={(e) => setProjeto(e.currentTarget.value)}>
                        <option value="64b87095c2b4169134de5e8a">Selecione um vinculo (opcional)</option>
                        {obras.filter((obra) => obra.type === 'projeto').map((obra) => {
                            return (
                                <option value={`${obra._id}`}>{obra.name}</option>
                            )
                        }
                        )}
                    </Select>
                </Flex>
            </Flex>
            <Flex mt={3}>
                <Button onClick={() => handleSave()} >Salvar</Button>
            </Flex>
        </Wrapper>
    )
}