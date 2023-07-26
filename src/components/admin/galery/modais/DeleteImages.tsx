import { useValidation } from '@/_hooks/useValidate';
import { deleteImages } from '@/_services/galery.service'
import { DeleteIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react'

interface ModalCancelProps {
    imagesToDelete: string[],
    flushHook: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteImages(props: ModalCancelProps) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [, setIsLoading] = useState<boolean>(false);
    const toastIdRef = useRef<any>()
    const sysValidation = useValidation();
    const toast = useToast();
    const deleteGaleryImages = async () => {
        setIsLoading(true)
        toastIdRef.current = toast({
            title: 'Deletando imagens.',
            description: 'As imagens estão sendo deletadas.',
            status: 'loading',
            duration: 5000,
            isClosable: true
        })
        try {
            await sysValidation(async (token: string) => {
                await deleteImages(props.imagesToDelete, token);
                if (toastIdRef.current) {
                    toast.close(toastIdRef.current)
                }
                toast({
                    title: 'Imagens deletadas.',
                    description: 'As imagens foram deletadas.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                })
            });
        } catch (error) {
            console.log(error);
            if (toastIdRef.current) {
                toast.close(toastIdRef.current)
            }
            toast({
                title: 'As imagens não foram deletadas.',
                description: 'As imagens não foram deletadas, ocorreu algum erro.',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        setIsLoading(false)
        onClose();
        props.flushHook(true)
    }
    return (
        <>
            <Button isDisabled={props.imagesToDelete.length == 0} cursor="pointer" onClick={onOpen} height='40px' width='60px' colorScheme="red" variant="outline">
                <DeleteIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent flexGrow={1} flexShrink={1} borderRadius={8} borderLeft="12px solid red">
                    <ModalHeader>Exluir imagem(s)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Tem certeza de que deseja excluir as imagens selecionadas?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => deleteGaleryImages()}>
                            Sim
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Não</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>


    )

}