import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Checkbox } from "@chakra-ui/react";
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";
import PaginationComponent from "@/components/Pagination";
import MiniLoading from "@/components/miniLoading";

export default function SelectImages(props: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<any>([])
    const [selectedImages, setSelectedImages] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0)
    const perPage = 21;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation()

    const handleImages = async () => {
        setLoading(true)
        await sysValidation(async (token: string) => {
            const response = await getImages(currentPage, token)
            setImages(response.files)
            setTotal(response.totalFiles)
        })
        setLoading(false)
    }

    const handleSelectImages = (location: string) => {
        if (selectedImages.includes(location)) {
            setSelectedImages(selectedImages.filter((item: string) => item !== location))
        } else {
            setSelectedImages([...selectedImages, location])
        }
    }

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleSave = async () => {
        props.setImages(selectedImages)
        onClose()
    }

    useEffect(() => {
        handleImages()
    }, [currentPage])

    return (
        <>
            <Button cursor="pointer" onClick={onOpen} height='40px' width='60px' colorScheme="green" variant="outline">
                <AddIcon />
            </Button>

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Imagens da Galeria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loading ? (<MiniLoading size={80} color="#ecc94b"/>) : (
                            <>
                                <Flex flexFlow='wrap' justifyContent='center'>
                                    {
                                        images.map((image: any, index: number) => {
                                            return (
                                                <Card m={1} p={2} key={index}>
                                                    <Flex justifyContent='flex-end'>
                                                        <Checkbox isChecked={selectedImages.includes(image.location)} onChange={() => handleSelectImages(image.location)} m={2} position='absolute' />
                                                    </Flex>
                                                    <Image width='180px' height='180px' src={image.location} alt={image.location} />
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
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave} >
                            Salvar
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )

}   