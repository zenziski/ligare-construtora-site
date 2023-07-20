import { useEffect, useState } from "react";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Box, Checkbox, useToast } from "@chakra-ui/react";
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";

export default function SelectImages(props: any) {

    const [images, setImages] = useState<any>([])
    const [selectedImage, setSelectedImage] = useState<any>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation()
    const toast = useToast()

    const handleImages = async () => {
        await sysValidation(async (token: string) => {
            const response = await getImages(token)
            setImages(response.files)
        })
    }

    const handleSelectImages = (location: string) => {
        setSelectedImage(location)
    }
    const handleSave = async () => {
        props.setImage(selectedImage)
        onClose()
    }

    useEffect(() => {
        if(isOpen){
            handleImages()
        }
    }, [isOpen])

    return (
        <>
            <Button cursor="pointer" onClick={onOpen} height='40px' width='60px' colorScheme="green" variant="outline">
                <LinkIcon />
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
                                                <Checkbox isChecked={selectedImage === image.location} onChange={() => handleSelectImages(image.location)} m={2} position='absolute' />
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