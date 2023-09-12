import { EditIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { editCover } from "@/_services/obras.service";
import { useValidation } from "@/_hooks/useValidate";
export default function EditCover() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation();
    const toast = useToast();

    const handleSave = async () => {

        const data = {
            image: ''
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

    return (
        <>
            <Button cursor="pointer" ml={2} onClick={onOpen} height='40px' width='60px' colorScheme="blue" variant="outline">
                <EditIcon />
            </Button >

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader fontFamily="Poppins-Medium">Alterar Foto de Capa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

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

function toast(arg0: { title: string; description: string; status: string; duration: number; }) {
    throw new Error("Function not implemented.");
}
