import { LinkIcon } from "@chakra-ui/icons";
import { Button, Image, Card, Checkbox, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { editCover } from "@/_services/obras.service";
import { useValidation } from "@/_hooks/useValidate";
import PaginationComponent from "@/components/Pagination";
import { useEffect, useState } from "react";
import { getImages } from "@/_services/galery.service";
export default function EditCover() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation();
    const toast = useToast();

    const [images, setImages] = useState<string[]>([])
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0)
    const perPage = 21;

    const handleImages = async () => {

        await sysValidation(async (token: string) => {
            const response = await getImages(currentPage, token)
            setImages(response.files)
            setTotal(response.totalFiles)
        })
    }

    const handleSelectImages = (location: string) => {
        setSelectedImage(location)
    }

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleSave = async () => {
        const data = {
            coverImage: selectedImage
        }

        await sysValidation(async (token) => {
            try {

                await editCover(data, token)

                toast({
                    title: "Sucesso!",
                    description: "Capa editada com sucesso!",
                    status: "success",
                    duration: 5000,
                });
                onClose()
            } catch (error) {
                toast({
                    title: "Erro!",
                    description: "Erro ao editar capa!",
                    status: "error",
                    duration: 5000,
                });
            }
        })

    }

    useEffect(() => {
        handleImages()
    }, [])

    return (
        <>
            <Button cursor="pointer" ml={2} onClick={onOpen} height='40px' width='60px' colorScheme="blue" variant="outline">
                <LinkIcon />
            </Button >

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader fontFamily="Poppins-Medium">Alterar Foto de Capa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexFlow='wrap' justifyContent='center'>
                            {
                                images.map((image: any) => {
                                    return (
                                        <Card m={1} p={2}>
                                            <Flex justifyContent='flex-end'>
                                                <Checkbox isChecked={selectedImage === image.location} onChange={() => handleSelectImages(image.location)} m={2} position='absolute' />
                                            </Flex>
                                            <Image width='180px' height='180px' src={image.location} />
                                        </Card>
                                    )
                                })
                            }
                        </Flex>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={Math.ceil(total / perPage)}
                            onPageChange={handlePageChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}