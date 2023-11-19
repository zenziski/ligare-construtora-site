import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import SelectImages from "../../home/modais/SelectImages";
import { useEffect, useState } from "react";
import { useValidation } from "@/_hooks/useValidate";
import { getContactImage, postImageContact } from "@/_services/contact.service";
import { SettingsIcon } from "@chakra-ui/icons";


export default function EditContactImage() {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sysValidation = useValidation()
    const [image, setImage] = useState<string>("")
    const [flushook, setFlushook] = useState<boolean>(false);

    useEffect(() => {
        console.log(image);
    }, [image])

    const getData = async () => {
        const response = await getContactImage();
        setImage(response.data.name)
        console.log(response);
    }

    useEffect(() => {
        setFlushook(false)
        getData();
    }, [flushook])

    const handleSave = async () => {
        await sysValidation(async (token: string) => {
            const response = await postImageContact({ name: image }, token);
            if (response) {
                toast({
                    title: "Dados salvos com sucesso",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Erro ao salvar os dados",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        })
        setFlushook(true)
        onClose()
    }

    return (
        <Flex justifyContent={'flex-end'}>
            <Button onClick={onOpen} height='40px' width='60px' colorScheme="blue" variant="outline">
                <SettingsIcon />
            </Button>

            <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Imagem principal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex w={'100%'} direction={'column'} justifyContent={'center'} alignItems={'center'} p={2}>
                            <SelectImages setImage={setImage} />
                            <Image mt={3} src={image} h='500px' />
                            <Button mt={3} bgColor='primary' onClick={handleSave}>Salvar</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}    
