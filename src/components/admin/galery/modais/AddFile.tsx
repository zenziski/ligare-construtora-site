import { useState, useRef, useEffect } from "react"
import { Flex, Text, Card, Input, Button, useToast, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Image, Grid, GridItem, Checkbox } from "@chakra-ui/react"
import MiniLoading from "@/components/miniLoading"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Axios from "axios";

interface IAddFileProps {
    flushHook: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFile(props: IAddFileProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
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
        try {
            const formData = new FormData()
            files.forEach((image: any, index: any) => {
                formData.append('files', image);
            })
            await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setFiles([]); // Limpar o arquivo selecionado após o upload
            setIsLoading(false)

            toast({
                title: 'Sucesso',
                description: `Arquivo enviado com sucesso`,
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            props.flushHook(true)
        } catch (error) {
            toast({
                title: 'Erro',
                description: `Erro ao fazer upload de imagem ${error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setIsLoading(false);
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

    const handleDeleteImage = (file: string) => {
        const filteredFiles = files.filter((_file: File) => _file.name !== file)
        setFiles(filteredFiles)
    }


    return (
        <>
            <Button cursor="pointer" onClick={onOpen} height='40px' width='60px' colorScheme="green" variant="outline">
                <AddIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl" >
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent flexGrow={1} flexShrink={1} borderRadius={8} borderLeft="12px solid #ecdb19">
                    <ModalHeader><Text fontSize="20px" fontFamily="Poppins-Medium">Adicionar Imagens</Text></ModalHeader>
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
                            <Flex direction="column" alignItems="center">
                                <Text fontSize="xl" mb={4} fontFamily="Poppins-Medium">
                                    Arraste e solte as imagens aqui
                                </Text>
                                <Image src="../icons/download.svg" w={40} h={40} mt="-20px" />
                            </Flex>
                            <Input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                multiple
                            />
                        </Card>
                        {files.length > 0 && (
                            <Grid templateColumns='repeat(4, 1fr)' gap={3} mt={6}>
                                {
                                    files.map((file: File, index) => (
                                        <GridItem>
                                            <Flex flexDir="column" position="relative" flexGrow={1}>
                                                <Flex top={0} left="110px" right={0} p={4} position="absolute" justifyContent="space-between" alignItems="center">
                                                    <Flex cursor="pointer" onClick={() => handleDeleteImage(file.name)}>
                                                        <Flex>
                                                            <DeleteIcon color="red" />
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex w="150px" h="100px" bgImage={URL.createObjectURL(file)} backgroundSize="cover" backgroundRepeat="no-repeat" />
                                                <Text key={index} fontFamily="Poppins-Medium">{file.name}</Text>
                                            </Flex>
                                        </GridItem>
                                    ))
                                }
                            </Grid>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Flex direction="row" justifyContent="space-around" w="100%">
                            <Button color="white" bgColor='blackAlpha.600' _hover={{ bg: '#ecdb19', color: "black" }} isDisabled={isLoading || files.length == 0} onClick={handleUpload} >
                                Enviar
                                {isLoading && (<MiniLoading color="black" size={20} />)}
                            </Button>
                            <Button color="white" bgColor='blackAlpha.600' _hover={{ bg: '#ecdb19', color: "black" }} isDisabled={isLoading} onClick={onClose}>
                                Fechar
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>

    )
}