import { useState, useRef } from "react"
import { Flex, Text, Card, Input, Button, useToast, Image, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import MiniLoading from "@/components/miniLoading"
import { Wrapper } from "@/components/wrapper";

export default function Galery() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();

    const handleUpload = async () => {

        if (!files) {
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

    return (
        <Wrapper title="Galeria">
            <Flex padding={2} flexDirection='column' height='100vh' overflow='auto' >
                <Flex>
                    <Button onClick={onOpen} bgColor='blackAlpha.400'>Adicionar novas imagens</Button>
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
            </Flex>
        </Wrapper>
    )
}