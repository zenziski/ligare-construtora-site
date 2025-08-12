import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
    VStack,
    HStack,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Badge,
    IconButton,
    useColorModeValue,
    Box,
    FormControl,
    FormHelperText,
    Alert,
    AlertIcon
} from "@chakra-ui/react";
import { FiPlus, FiTrash2, FiImage, FiAlertCircle } from 'react-icons/fi';
import { useValidation } from "@/_hooks/useValidate";
import { createSlug } from "@/utils/createSlug";
import AddImages from "./AddImages";
import { postObras, getSlugObra } from "@/_services/obras.service";

export default function NovaObra(props: any) {
    const [nome, setNome] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [type, setType] = useState<string>('construcao')
    const [images, setImages] = useState<any[]>([])
    const [slugs, setSlugs] = useState<any>([]);
    const [slugError, setSlugsError] = useState<boolean>(false);
    const [vinculo, setVinculo] = useState<any>("64b87095c2b4169134de5e8a");
    const toast = useToast();
    const sysValidation = useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const [inputs, setInputs] = useState<{ campo: string; valor: string }[]>([]);
    const [campo, setCampo] = useState("");
    const [valor, setValor] = useState("");

    const handleAddInputs = () => {
        const newInputPair = { campo: campo, valor: valor };
        setInputs((prevInputs) => [...prevInputs, newInputPair]);
        setCampo("");
        setValor("");
    };

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

    const getSlugs = async () => {
        const result = await getSlugObra();
        setSlugs(result);
    }

    useEffect(() => {
        getSlugs();
    }, [])

    useEffect(() => {
        if(slug?.length && slugs.find((s: {slug: string}) => s.slug == slug)){
            setSlugsError(true)
        } else {
            setSlugsError(false)
        }
    }, [slug, slugs])

    function debounce(func: any, timeout = 300) {
        let timer: any;
        return function (this: any, ...args: any) {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const handleNome = (event: any) => {
        setNome(event.target.value)
        debounce(setSlug(createSlug(event.target.value || "") as string))
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
                props.flushook(true)
            } catch (error) {
                toast({
                    title: "Erro!",
                    description: "Erro ao cadastrar obra!",
                    status: "error",
                    duration: 5000,
                });
            }
        })
        setIsLoading(false)
    }
    
    const resetForm = () => {
        setNome('');
        setSlug('');
        setType('construcao');
        setImages([]);
        setInputs([]);
        setCampo('');
        setValor('');
        setVinculo("64b87095c2b4169134de5e8a");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <>
            <Button 
                leftIcon={<FiPlus />}
                cursor="pointer" 
                onClick={onOpen} 
                colorScheme="blue"
                size="md"
            >
                Nova Obra
            </Button>

            <Modal size="4xl" isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent maxH="90vh" overflowY="auto">
                    <ModalHeader>
                        <HStack spacing={3}>
                            <FiPlus />
                            <Heading size="lg">Criar Nova Obra</Heading>
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
                                            <FormControl flex={2} isRequired>
                                                <FormLabel fontWeight="semibold">Nome da Obra</FormLabel>
                                                <Input 
                                                    placeholder="Digite o nome da obra" 
                                                    value={nome} 
                                                    onChange={(e) => handleNome(e)}
                                                    size="md"
                                                />
                                            </FormControl>
                                            <FormControl flex={1}>
                                                <FormLabel fontWeight="semibold">Slug</FormLabel>
                                                <Input 
                                                    placeholder="URL amigável" 
                                                    value={slug} 
                                                    onChange={(e) => setSlug(e.target.value)}
                                                    size="md"
                                                    isInvalid={slugError}
                                                />
                                                {slugError ? (
                                                    <FormHelperText color="red.500">
                                                        <HStack spacing={1}>
                                                            <FiAlertCircle />
                                                            <Text>Este slug já existe</Text>
                                                        </HStack>
                                                    </FormHelperText>
                                                ) : (
                                                    <FormHelperText>URL amigável para a obra</FormHelperText>
                                                )}
                                            </FormControl>
                                        </HStack>
                                        <HStack spacing={4}>
                                            <FormControl isRequired>
                                                <FormLabel fontWeight="semibold">Tipo de Projeto</FormLabel>
                                                <Select value={type} onChange={(e) => setType(e.currentTarget.value)} size="md">
                                                    <option value="construcao">Construção</option>
                                                    <option value="reforma">Reforma</option>
                                                    <option value="projeto">Projeto</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontWeight="semibold">Projeto Relacionado</FormLabel>
                                                <Select value={vinculo} onChange={(e) => setVinculo(e.currentTarget.value)} size="md">
                                                    <option value="64b87095c2b4169134de5e8a">Nenhum vínculo</option>
                                                    {props.todasObras && props.todasObras.map((obra: any) => (
                                                        <option key={obra._id} value={obra._id}>{obra.type} - {obra.name}</option>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Vincular a outro projeto (opcional)</FormHelperText>
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
                                        {inputs.length > 0 && (
                                            <VStack spacing={3} align="stretch">
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
                                            </VStack>
                                        )}
                                        
                                        <Card variant="outline" borderStyle="dashed">
                                            <CardBody>
                                                <VStack spacing={3}>
                                                    <Text fontSize="sm" color="gray.600">
                                                        Adicione campos personalizados para informações específicas desta obra
                                                    </Text>
                                                    <HStack spacing={3} w="100%">
                                                        <Input
                                                            value={campo}
                                                            onChange={(e) => setCampo(e.target.value)}
                                                            placeholder="Nome do campo (ex: Área)"
                                                            size="sm"
                                                        />
                                                        <Input
                                                            value={valor}
                                                            onChange={(e) => setValor(e.target.value)}
                                                            placeholder="Valor do campo (ex: 250m²)"
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
                                        <Heading size="md">Imagens da Obra</Heading>
                                        <AddImages setImages={setImages} />
                                    </HStack>
                                </CardHeader>
                                <CardBody pt={0}>
                                    {images && images.length > 0 ? (
                                        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
                                            {images.map((image: any, index: number) => (
                                                <Card key={index} variant="outline">
                                                    <CardBody p={2}>
                                                        <Image 
                                                            h="150px" 
                                                            w="100%" 
                                                            src={image} 
                                                            alt={`Imagem ${index + 1}`}
                                                            objectFit="cover"
                                                            borderRadius="md"
                                                        />
                                                        <Text fontSize="xs" color="gray.600" mt={2} textAlign="center">
                                                            Imagem {index + 1}
                                                        </Text>
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
                            loadingText="Criando obra..."
                            onClick={handleSubmit}
                            leftIcon={<FiPlus />}
                            isDisabled={slugError || !nome.length}
                        >
                            Criar Obra
                        </Button>
                        <Button variant="ghost" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}   