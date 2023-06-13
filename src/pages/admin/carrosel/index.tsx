import { useState } from "react"
import { Flex, Text, Card, CardBody, Input, Button, useToast, Image } from "@chakra-ui/react"
import MiniLoading from "@/components/miniLoading"

export default function Carrosel() {

    const [file, setFile] = useState<File | undefined>(); // Adicionando o tipo File para o estado 'file'
    const [selectedImage, setSelectedImage] = useState<string | undefined>(); // Definindo o tipo da URL da imagem selecionada
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imgs, setImgs] = useState<string[]>([]);

    const toast = useToast();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setSelectedImage(URL.createObjectURL(selectedFile));
        }
    }

    const handleUpload = async () => {

        if (!file) {
            toast({
                title: 'Arquivo obrigatório',
                description: `É obrigatório colocar um arquivo para upload`,
                status: 'error',
                duration: 5000,
                isClosable: true
            })

            return
        }

        setIsLoading(true)

        console.log(file);

        // Simulação de carga assíncrona (remova isso no código final)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setSelectedImage(undefined); // Limpar a prévia da imagem após o upload
        setFile(undefined); // Limpar o arquivo selecionado após o upload

        setIsLoading(false)

        toast({
            title: 'Sucesso',
            description: `Arquivo enviado com sucesso`,
            status: 'success',
            duration: 5000,
            isClosable: true
        })

        return

    }

    return (
        <Flex padding={2} flexDirection='column' height='100vh' overflow='auto' >
            <Text fontSize='2xl' fontWeight='bold'>
                Upload de imagens para o carrosel
            </Text>
            <Flex justifyContent='center'>
                <Card marginTop={10}>
                    <CardBody display='flex'>
                        <Input placeholder="Imagem" type='file' isDisabled={isLoading} onChange={handleFile} accept="image/*" />
                        <Button colorScheme='yellow' isDisabled={isLoading} onClick={handleUpload} ><Text marginLeft={2}>Enviar</Text> {isLoading ? (<MiniLoading color="black" size='20px' />) : null}</Button>
                    </CardBody>
                </Card>
                <Flex marginLeft={10} >
                    {selectedImage ? (<Image alt='preview' src={selectedImage} width='300px' height='300px' />) : null}
                </Flex>
            </Flex>
            <Flex>
                {
                    imgs.map((e: any) => {
                        return (
                            <>
                                ola
                            </>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}