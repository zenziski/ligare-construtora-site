import { useEffect, useState } from "react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { 
    Button, 
    Image, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure, 
    Flex, 
    useToast, 
    FormLabel, 
    Text, 
    Input, 
    Select, 
    Grid, 
    GridItem, 
    Checkbox,
    VStack,
    HStack,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Badge,
    IconButton,
    Divider,
    useColorModeValue,
    Box,
    FormControl,
    FormHelperText
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiStar } from 'react-icons/fi';
import { useValidation } from "@/_hooks/useValidate";
import { createSlug } from "@/utils/createSlug";
import AddImages from "./AddImages";
import { editMainImage, editObras } from "@/_services/obras.service";

export default function EditObra(props: any) {
    const [nome, setNome] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [type, setType] = useState<string>('construcao')
    const [images, setImages] = useState<any[]>([])
    const [imagesToRemove, setImagesToRemove] = useState<string[]>([])
    const [vinculo, setVinculo] = useState<any>("");
    const [mainImage, setMainImage] = useState<any>('')
    const [ordem, setOrdem] = useState<any>('')
    const toast = useToast();
    const sysValidation = useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [inputs, setInputs] = useState<{ campo: string; valor: string }[]>([]);
    const [campo, setCampo] = useState("");
    const [valor, setValor] = useState("");

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const handleSelectImages = (location: string) => {

        if (imagesToRemove.includes(location)) {
            setImagesToRemove(imagesToRemove.filter((item: string) => item !== location))
        } else {
            setImagesToRemove([...imagesToRemove, location])
        }
    }

    const handleRemoveImages = async () => {

        const arrAux = images.filter((image) => !imagesToRemove.includes(image))
        setImages(arrAux)
        toast({
            title: "Sucesso!",
            description: "Imagens removidas com sucesso, salve para confirmar",
            status: "success",
            duration: 5000,
        });
        handleSubmit()
    }

    const handleAddInputs = () => {
        const newInputPair = { campo: campo, valor: valor };
        setInputs((prevInputs) => [...prevInputs, newInputPair]);
        setCampo("");
        setValor("");
    };

    function debounce(func: any, timeout = 1000) {
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

    const handleChangeMainImage = async (image: any) => {
        await sysValidation(async (token) => {
            try {
                await editMainImage({ mainImage: image, _id: props.data._id }, token)
                onClose();
                props.flushook(true)
                toast({
                    title: "Sucesso!",
                    description: "Imagem principal definida com sucesso!",
                    status: "success",
                    duration: 5000,
                });
            } catch (error) {
                toast({
                    title: "Erro!",
                    description: "Erro ao editar obra!",
                    status: "error",
                    duration: 5000,
                });
            }
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const data = {
            name: nome,
            slug,
            type,
            images,
            data: inputs,
            vinculo,
            ordem
        }
        await sysValidation(async (token) => {
            try {
                await editObras({ _id: props.data._id, ...data }, token)
                toast({
                    title: "Sucesso!",
                    description: "Obra editada com sucesso!",
                    status: "success",
                    duration: 5000,
                });
                onClose();
                props.flushook(true)
            } catch (error) {
                toast({
                    title: "Erro!",
                    description: "Erro ao editar obra!",
                    status: "error",
                    duration: 5000,
                });
            }
        })
        setIsLoading(false)
    }
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'reforma': return 'orange';
            case 'construcao': return 'green';
            case 'projeto': return 'blue';
            default: return 'gray';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'reforma': return 'Reforma';
            case 'construcao': return 'Construção';
            case 'projeto': return 'Projeto';
            default: return type;
        }
    };

    useEffect(() => {
        if (isOpen) {
            setNome(props.data.name)
            setSlug(props.data.slug)
            setType(props.data.type)
            setImages(props.data.images)
            setInputs(props.data.data)
            setVinculo(props.data.vinculo)
            setMainImage(props.data.mainImage)
            setOrdem(props.data.ordem)
            setImagesToRemove([])
        }
    }, [isOpen])

    return (
        <>
            <IconButton
                aria-label="Editar obra"
                icon={<FiEdit2 />}
                size="sm"
                variant="ghost"
                colorScheme="blue"
                cursor="pointer"
                onClick={onOpen}
            />

            <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent maxH="90vh" overflowY="auto">
                    <ModalHeader>
                        <HStack spacing={3}>
                            <FiEdit2 />
                            <Heading size="lg">Editar Obra</Heading>
                            <Badge colorScheme={getTypeColor(type)} variant="subtle">
                                {getTypeLabel(type)}
                            </Badge>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={6} align="stretch">
                            {/* Basic Information Card */}
                            <Card bg={cardBg}>
                                <CardHeader pb={3}>
                                    <Heading size="md">Informações Básicas</Heading>
                                </CardHeader>
                                <CardBody pt={0}>
                                    <VStack spacing={4} align="stretch">
                                        <HStack spacing={4} align="start">
                                            <FormControl flex={2}>
                                                <FormLabel fontWeight="semibold">Nome da Obra</FormLabel>
                                                <Input 
                                                    placeholder="Nome da obra" 
                                                    value={nome} 
                                                    onChange={(e) => handleNome(e)}
                                                    size="md"
                                                />
                                            </FormControl>
                                            <FormControl flex={1}>
                                                <FormLabel fontWeight="semibold">Slug</FormLabel>
                                                <Input 
                                                    placeholder="Slug" 
                                                    value={slug} 
                                                    onChange={(e) => setSlug(e.target.value)}
                                                    size="md"
                                                />
                                                <FormHelperText>URL amigável para a obra</FormHelperText>
                                            </FormControl>
                                        </HStack>
                                        <HStack spacing={4}>
                                            <FormControl>
                                                <FormLabel fontWeight="semibold">Tipo de Projeto</FormLabel>
                                                <Select value={type} onChange={(e) => setType(e.currentTarget.value)} size="md">
                                                    <option value="construcao">Construção</option>
                                                    <option value="reforma">Reforma</option>
                                                    <option value="projeto">Projeto</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight="semibold">Ordem de Exibição</FormLabel>
                                                <Input 
                                                    placeholder="Ordem" 
                                                    type="number" 
                                                    value={ordem} 
                                                    onChange={(e) => setOrdem(e.target.value)}
                                                    size="md"
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight="semibold">Projeto Relacionado</FormLabel>
                                                <Select value={vinculo} onChange={(e) => setVinculo(e.currentTarget.value)} size="md">
                                                    <option value="64b87095c2b4169134de5e8a">Nenhum vínculo</option>
                                                    {props.todasObras && props.todasObras.filter((item: any) => item._id !== props.data._id).map((obra: any) => (
                                                        <option key={obra._id} value={obra._id}>{obra.type} - {obra.name}</option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>

                            {/* Custom Fields Card */}
                            <Card bg={cardBg}>
                                <CardHeader pb={3}>
                                    <Heading size="md">Campos Personalizados</Heading>
                                </CardHeader>
                                <CardBody pt={0}>
                                    <VStack spacing={4} align="stretch">
                                        {inputs.map((inputPair, index) => (
                                            <Card key={index} variant="outline" size="sm">
                                                <CardBody>
                                                    <HStack spacing={3}>
                                                        <Input
                                                            value={inputPair.campo}
                                                            onChange={(e) =>
                                                                setInputs((prevInputs) =>
                                                                    prevInputs.map((input, i) =>
                                                                        i === index ? { ...input, campo: e.target.value } : input
                                                                    )
                                                                )
                                                            }
                                                            placeholder="Nome do campo"
                                                            size="sm"
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
                                                            placeholder="Valor do campo"
                                                            size="sm"
                                                        />
                                                        <IconButton
                                                            aria-label="Remover campo"
                                                            icon={<FiTrash2 />}
                                                            size="sm"
                                                            variant="ghost"
                                                            colorScheme="red"
                                                            onClick={() => setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index))}
                                                        />
                                                    </HStack>
                                                </CardBody>
                                            </Card>
                                        ))}
                                        
                                        <Card variant="outline" borderStyle="dashed">
                                            <CardBody>
                                                <VStack spacing={3}>
                                                    <HStack spacing={3} w="100%">
                                                        <Input
                                                            value={campo}
                                                            onChange={(e) => setCampo(e.target.value)}
                                                            placeholder="Nome do novo campo"
                                                            size="sm"
                                                        />
                                                        <Input
                                                            value={valor}
                                                            onChange={(e) => setValor(e.target.value)}
                                                            placeholder="Valor do novo campo"
                                                            size="sm"
                                                        />
                                                    </HStack>
                                                    <Button 
                                                        leftIcon={<FiPlus />}
                                                        onClick={handleAddInputs}
                                                        colorScheme="blue"
                                                        variant="outline"
                                                        size="sm"
                                                        isDisabled={!campo || !valor}
                                                    >
                                                        Adicionar Campo
                                                    </Button>
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    </VStack>
                                </CardBody>
                            </Card>

                            {/* Images Card */}
                            <Card bg={cardBg}>
                                <CardHeader pb={3}>
                                    <HStack justify="space-between">
                                        <Heading size="md">Gerenciar Imagens</Heading>
                                        <HStack>
                                            <AddImages setImages={setImages} />
                                            <Button 
                                                leftIcon={<FiTrash2 />}
                                                isDisabled={imagesToRemove.length === 0} 
                                                onClick={handleRemoveImages} 
                                                variant='outline' 
                                                colorScheme='red'
                                                size="sm"
                                            >
                                                Remover Selecionadas ({imagesToRemove.length})
                                            </Button>
                                        </HStack>
                                    </HStack>
                                </CardHeader>
                                <CardBody pt={0}>
                                    {images && images.length > 0 ? (
                                        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
                                            {images.map((image: any, index: number) => (
                                                <Card key={index} variant="outline" position="relative">
                                                    <CardBody p={2}>
                                                        <Box position="relative">
                                                            <Image 
                                                                h="150px" 
                                                                w="100%" 
                                                                src={image} 
                                                                alt="Imagem da obra" 
                                                                objectFit="cover"
                                                                borderRadius="md"
                                                            />
                                                            <Checkbox 
                                                                position="absolute"
                                                                top={2}
                                                                left={2}
                                                                isChecked={imagesToRemove.includes(image)}
                                                                onChange={() => handleSelectImages(image)}
                                                                bg="whiteAlpha.900"
                                                                borderRadius="md"
                                                            />
                                                            {mainImage === image && (
                                                                <Badge
                                                                    position="absolute"
                                                                    top={2}
                                                                    right={2}
                                                                    colorScheme="yellow"
                                                                    variant="solid"
                                                                >
                                                                    <HStack spacing={1}>
                                                                        <FiStar size={12} />
                                                                        <Text fontSize="xs">Principal</Text>
                                                                    </HStack>
                                                                </Badge>
                                                            )}
                                                        </Box>
                                                        <VStack mt={2} spacing={1}>
                                                            {mainImage === image ? (
                                                                <Text fontSize="xs" color="yellow.600" fontWeight="semibold">
                                                                    Imagem Principal
                                                                </Text>
                                                            ) : (
                                                                <Button 
                                                                    size="xs"
                                                                    colorScheme="yellow"
                                                                    variant="outline"
                                                                    leftIcon={<FiStar />}
                                                                    onClick={() => handleChangeMainImage(image)}
                                                                >
                                                                    Definir como Principal
                                                                </Button>
                                                            )}
                                                        </VStack>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box textAlign="center" py={8} color="gray.500">
                                            <FiImage size={48} />
                                            <Text mt={2}>Nenhuma imagem adicionada</Text>
                                            <Text fontSize="sm">Use o botão "Adicionar Imagens" para começar</Text>
                                        </Box>
                                    )}
                                </CardBody>
                            </Card>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            colorScheme="blue" 
                            mr={3} 
                            isLoading={isLoading}
                            loadingText="Salvando..."
                            onClick={handleSubmit}
                            leftIcon={<FiEdit2 />}
                        >
                            Salvar Alterações
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}   