import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Box, Checkbox } from "@chakra-ui/react";
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";

interface ModalSaveImagesProps {
    flushHook: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectImages(props: ModalSaveImagesProps) {

    const [images, setImages] = useState<any>([])
    const [selectedImages, setSelectedImages] = useState<any>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation()

    const handleImages = async () => {

        await sysValidation(async (token: string) => {
            const response = await getImages(token)
            setImages(response.files)
        })
    }

    const handleSelectImages = (_id: string) => {
        if (selectedImages.includes(_id)) {
            setSelectedImages(selectedImages.filter((item: string) => item !== _id))
        } else {
            setSelectedImages([...selectedImages, _id])
        }
    }

    const handleSave = () => {
        setSelectedImages([])
        onClose()
        props.flushHook(true)
    }

    useEffect(() => {
        handleImages()
    }, [])

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
                        <Flex flexFlow='wrap' justifyContent='center'>
                            {
                                images.map((image: any) => {
                                    return (
                                        <Card m={1} p={2}>
                                            <Flex justifyContent='flex-end'>
                                                <Checkbox isChecked={selectedImages.includes(image._id)} onChange={() => handleSelectImages(image._id)} m={2} position='absolute' />
                                            </Flex>
                                            <Image width='180px' height='180px' src={image.location} />
                                        </Card>
                                    )
                                })
                            }
                        </Flex>
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