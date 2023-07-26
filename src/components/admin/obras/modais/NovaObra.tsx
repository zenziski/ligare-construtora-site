import { useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, useToast, FormLabel, Text, Input, Select, Grid, GridItem } from "@chakra-ui/react";
import { useValidation } from "@/_hooks/useValidate";
import { createSlug } from "@/utils/createSlug";
import AddImages from "./AddImages";
import { postObras } from "@/_services/obras.service";

export default function NovaObra(props: any) {
    const [nome, setNome] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [type, setType] = useState<string>('construcao')
    const [images, setImages] = useState<any>([])
    const [vinculo, setVinculo] = useState<any>("64b87095c2b4169134de5e8a");
    const toast = useToast();
    const sysValidation = useValidation();
    const [isLoading, setIsLoading] = useState(false);

    const [inputs, setInputs] = useState<{ campo: string; valor: string }[]>([]);
    const [campo, setCampo] = useState("");
    const [valor, setValor] = useState("");

    const handleAddInputs = () => {
        const newInputPair = { campo: campo, valor: valor };
        setInputs((prevInputs) => [...prevInputs, newInputPair]);
        setCampo("");
        setValor("");
    };

    function debounce(func: any, timeout = 300) {
        let timer: any;
        return function (this: any, ...args: any) {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const handleNome = (event: any) => {
        setNome(event.target.value)
        debounce(setSlug(createSlug(event.target.value) as string))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const data = {
            name: nome,
            slug,
            type,
            images,
            data: inputs,
            vinculo
        }
        await sysValidation(async (token) => {
            try {
                await postObras(data, token)
                toast({
                    title: "Sucesso!",
                    description: "Obra cadastrada com sucesso!",
                    status: "success",
                    duration: 5000,
                });
                onClose()
            } catch (error) {
                toast({
                    title: "Erro!",
                    description: "Erro ao cadastrar obra!",
                    status: "error",
                    duration: 5000,
                });
            }
        })
        props.flushook(true)
        setIsLoading(false)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button cursor="pointer" onClick={onOpen} height='40px' width='60px' colorScheme="green" variant="outline">
                <AddIcon />
            </Button>


            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader fontFamily="Poppins-Medium">Adicionar nova obra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexFlow='wrap' gap={4}>
                            <Flex direction="column" gap={2} w="50%">
                                <FormLabel>
                                    <Text fontFamily="Poppins-Medium">Nome da Obra</Text>
                                </FormLabel>
                                <Input placeholder="Nome da obra" value={nome} onChange={(e) => handleNome(e)} />
                            </Flex>
                            <Flex direction="column" gap={2}>
                                <FormLabel>
                                    <Text fontFamily="Poppins-Medium">Slug</Text>
                                </FormLabel>
                                <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                            </Flex>
                        </Flex>
                        <Flex flexFlow='wrap' gap={4} mt={4}>
                            <Flex direction="column" gap={2} w="50%">
                                <FormLabel>
                                    <Text fontFamily="Poppins-Medium">Descrição</Text>
                                </FormLabel>
                                <Select value={type} onChange={(e) => setType(e.currentTarget.value)}>
                                    <option value="construcao">Construção</option>
                                    <option value="reforma">Reforma</option>
                                    <option value="projeto">Projeto</option>
                                </Select>
                            </Flex>
                        </Flex>
                        <Flex flexFlow='wrap' gap={4} mt={4}>
                            <Flex direction="column" gap={2}>
                                <>
                                    {inputs.map((inputPair, index) => (
                                        <Flex key={index} direction="row" gap={4} alignItems="center">
                                            <Input
                                                value={inputPair.campo}
                                                onChange={(e) =>
                                                    setInputs((prevInputs) =>
                                                        prevInputs.map((input, i) =>
                                                            i === index ? { ...input, campo: e.target.value } : input
                                                        )
                                                    )
                                                }
                                                placeholder="Campo"
                                            />
                                            <Input
                                                value={inputPair.valor}
                                                onChange={(e) =>
                                                    setInputs((prevInputs) =>
                                                        prevInputs.map((input, i) =>
                                                            i === index ? { ...input, valor: e.target.value } : input
                                                        )
                                                    )
                                                }
                                                placeholder="Valor"
                                            />
                                            <DeleteIcon cursor="pointer" onClick={() => setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index))} />
                                        </Flex>

                                    ))}
                                    <Flex direction="row" gap={4}>
                                        <Input
                                            value={campo}
                                            onChange={(e) => setCampo(e.target.value)}
                                            placeholder="Campo"
                                        />
                                        <Input
                                            value={valor}
                                            onChange={(e) => setValor(e.target.value)}
                                            placeholder="Valor"
                                        />
                                    </Flex>
                                    <Button onClick={handleAddInputs}>Adicionar Campos</Button>
                                </>
                            </Flex>
                        </Flex>
                        <Flex flexFlow='wrap' gap={4} mt={4}>
                            <Flex direction="column" gap={2} w="50%">
                                <FormLabel>
                                    <Text fontFamily="Poppins-Medium">Relação</Text>
                                </FormLabel>
                                <Select value={vinculo} onChange={(e) => setVinculo(e.currentTarget.value)}>
                                    <option value="64b87095c2b4169134de5e8a">Selecione um vinculo (opcional)</option>
                                    {props.todasObras.map((obra: any) => (
                                        <option value={obra._id}>{obra.type} - {obra.name}</option>
                                    ))}
                                </Select>
                            </Flex>
                        </Flex>
                        <Flex flexFlow='wrap' gap={4} mt={4}>
                            <Flex direction="column" gap={2}>
                                <FormLabel>
                                    <Text fontFamily="Poppins-Medium">Imagens</Text>
                                </FormLabel>
                                <AddImages setImages={setImages} />
                                <Flex w="100%">
                                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                                        {images && images.map((image: any, index: number) => (
                                            <GridItem>
                                                <Image h="250px" w="250px" src={image} alt="Imagem" key={index} />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} isDisabled={isLoading} onClick={() => handleSubmit()}>
                            Salvar
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}   