
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Divider, Card, CardBody, Input, Button, useToast, Image, Box, Stack } from "@chakra-ui/react"
import SelectImages from "./modais/SelectImages"
import { useEffect, useState } from "react";
import { useValidation } from '@/_hooks/useValidate';
import { postTextHome, getDataHome } from "@/_services/home.service";
import HomePreview from "./preview";

export default function Home() {

    const [refresh, setRefresh] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const toast = useToast();
    const sysValidation = useValidation();

    const fetchData = async () => {
        try {

            await sysValidation(async (token: string) => {
                const { data } = await getDataHome(token)

                setTitle(data.title)
                setDescription(data.description)
                setImages(data.images)

            })

            console.log('atualizou as imagens');

        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        try {


            await sysValidation(async (token: string) => {
                await postTextHome({ title, description }, token)
            })

            toast({
                title: 'Sucesso',
                description: 'Home atualizada',
                status: 'success',
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Erro',
                description: 'Ocorreu algum erro.',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
            console.log(error);

        }
    }

    useEffect(() => {
        setRefresh(false)
        fetchData()
    }, [refresh])

    return (
        <Wrapper title="Home">
            <Flex>
                <SelectImages flushHook={setRefresh} />
            </Flex>
            <Flex mt={4} width='100%'>
                <Stack spacing={3} width='100%'>
                    <Input placeholder="Titulo" value={title} onChange={text => setTitle(text.target.value)} />
                    <Input placeholder="Descrição" value={description} onChange={text => setDescription(text.target.value)} />
                </Stack>
            </Flex>
            <Flex mt={3}>
                <Button onClick={handleSave} >Salvar</Button>
            </Flex>
            <Divider mt={4} mb={4}  />
            <HomePreview images={images} description={description} title={title} />
        </Wrapper>
    )
}