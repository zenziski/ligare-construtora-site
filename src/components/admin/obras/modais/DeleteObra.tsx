import { useEffect, useState } from "react";
import { AddIcon, ArrowRightIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Button, Image, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Box, Checkbox, useToast, FormLabel, Text, Input, Select, Grid, GridItem } from "@chakra-ui/react";
import { useValidation } from "@/_hooks/useValidate";
import { deleteObra, editObras, postObras } from "@/_services/obras.service";

export default function EditObra(props: any) {
    const toast = useToast();
    const sysValidation = useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteObra = async () => {
        setIsLoading(true)
        await sysValidation(async (token) => {
            await deleteObra(props.data._id, token)
            toast({
                title: "Sucesso!",
                description: "Obra excluída com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
        onClose();
        props.flushook(true)
    }

    return (
        <>
            <DeleteIcon color="red" cursor="pointer" onClick={onOpen} />

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader fontFamily="Poppins-Medium">Excluir obra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>
                            <Text fontFamily="Poppins-Medium">Deseja excluir a {props.data.type} {props.data.name}?</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} isDisabled={isLoading} onClick={() => handleDeleteObra()}>
                            Excluir
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}   