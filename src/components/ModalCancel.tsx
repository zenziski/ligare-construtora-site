import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react'

export default function ModalCancel({ nameImage, _id }) {

    const { isOpen, onClose, onOpen } = useDisclosure()

    return (

        <>
            <Button onClick={onOpen} zIndex='999' size='sm' position='absolute' top="4px" right='4px' colorScheme='red'>Delete</Button>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Exluir imagem</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Tem certeza de que deseja excluir a imagem: {nameImage} da galeria?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} >
                            Excluir
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>


    )

}