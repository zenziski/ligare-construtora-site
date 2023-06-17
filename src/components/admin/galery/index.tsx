import { useState, useRef, useEffect } from "react"
import { Flex, Text, Card, Input, Button, useToast, Image, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import MiniLoading from "@/components/miniLoading"
import { Wrapper } from "@/components/wrapper";
import Axios from 'axios';
import { AddIcon } from '@chakra-ui/icons'
import ModalCancel from "@/components/ModalCancel";

export default function Galery() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [galeryImages, setGaleryImages] = useState([]);
    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()


    const toast = useToast();

    const handleUpload = async () => {

        if (files.length === 0) {
            toast({
                title: 'Arquivo obrigatório',
                description: `É obrigatório colocar pelo menos um arquivo para upload`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            return
        }

        setIsLoading(true)

        // Simulação de carga assíncrona (remova isso no código final)

        try {
            const formData = new FormData()

            files.forEach((image: any, index: any) => {
                formData.append('files', image);
            })

            const response = await Axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            fetchData()

            setFiles([]); // Limpar o arquivo selecionado após o upload
            setIsLoading(false)

            toast({
                title: 'Sucesso',
                description: `Arquivo enviado com sucesso`,
                status: 'success',
                duration: 5000,
                isClosable: true
            })

            return
        } catch (error) {
            toast({
                title: 'Erro',
                description: `Erro ao fazer upload de imagem ${error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            return
        }



    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles(droppedFiles);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {
        fileInputRef.current!.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        setFiles(selectedFiles);
    };

    const handleDeleteImage = () => {
        try {

        } catch (error) {

        }
    }

    const fetchData = async () => {
        try {

            const { data } = await Axios.get('http://localhost:3001/upload')

            setGaleryImages(data.files)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchData()

    }, [])

    return (
        <Wrapper title="Galeria">
            <Flex padding={2} flexDirection='column' height='100vh' overflow='auto' >
                <Flex>
                    <Button bgColor='blackAlpha.400' onClick={() => setIsEditing(!isEditing)} >{isEditing ? 'Parar edição' : 'Editar'}</Button>
                </Flex>
                <Flex flexWrap='wrap'>
                    {
                        galeryImages.map((image: any) => {
                            return (
                                <Card key={image._id} m={2}>
                                    <Box
                                        as="button"
                                        position="relative"
                                        overflow="hidden"
                                        cursor="pointer"
                                        width="200px"
                                        borderRadius="4px"
                                        height="200px"

                                    >
                                        {
                                            isEditing ? (
                                                <ModalCancel nameImage={image.name} _id={image._id} />
                                            ) : null
                                        }
                                        <Image
                                            transition="opacity 0.3s"
                                            _hover={{ opacity: 0.5 }}
                                            src={image.location}
                                            alt={image.location}
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            width="100%"
                                            height="100%"
                                        />
                                    </Box>
                                </Card>
                            )
                        })
                    }
                    <Card display='flex' alignItems='center' justify='center' height='210px' width='200px' >
                        <Button onClick={onOpen} height='180px' width='180px'><AddIcon color='blackAlpha.600' width='50px' height='50px' /></Button>
                    </Card>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Adicionar Imagem</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Card
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            borderColor="black"
                            p={4}
                            textAlign="center"
                            onClick={handleClick}
                            cursor="pointer"
                        >
                            <Text fontSize="xl" mb={4}>
                                Arraste e solte as imagens aqui
                            </Text>
                            <Input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                multiple
                            />
                            {files.length > 0 && (
                                <Box>
                                    <Text fontSize="lg" mb={2}>
                                        Arquivos:
                                    </Text>
                                    <Flex overflowY='auto'>
                                        {files.map((file: File, index) => (
                                            <div style={{ margin: '10px' }}>
                                                <Image src={URL.createObjectURL(file)} width='300px' height='300px' />
                                                <Text key={index}>{file.name}</Text>
                                            </div>
                                        ))}
                                    </Flex>
                                </Box>
                            )}

                        </Card>
                        <Box mt={2}>
                            <Button bgColor='blackAlpha.400' _hover={{ bg: '#ecdb19' }} isDisabled={isLoading} onClick={handleUpload} ><Text marginLeft={2}>Enviar</Text> {isLoading ? (<MiniLoading color="black" size={20} />) : null}</Button>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Wrapper>
    )
}