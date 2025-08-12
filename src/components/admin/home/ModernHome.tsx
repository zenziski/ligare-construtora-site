'use client'
import { 
  Box, 
  VStack, 
  HStack,
  Card, 
  CardBody, 
  CardHeader,
  Heading,
  Text, 
  Button, 
  useToast, 
  Image, 
  FormLabel, 
  Textarea, 
  Select,
  FormControl,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Badge,
  Spinner
} from "@chakra-ui/react";
import SelectImages from "./modais/SelectImages";
import { useEffect, useState } from "react";
import { useValidation } from '@/_hooks/useValidate';
import { postHomeData, getDataHome } from "@/_services/home.service";
import { getObras } from "@/_services/obras.service";
import { FiSave, FiImage, FiHome } from 'react-icons/fi';

export default function ModernHome() {
    const [description, setDescription] = useState<string>('');
    const [reforma, setReforma] = useState<any>(null);
    const [construcao, setConstrucao] = useState<any>(null);
    const [projeto, setProjeto] = useState<any>(null);
    const [obras, setObras] = useState<any[]>([]);
    const [imagemPrincipal, setImagemPrincipal] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const toast = useToast();
    const sysValidation = useValidation();
    const cardBg = useColorModeValue('white', 'gray.800');

    const getData = async () => {
        try {
            setLoading(true);
            const obras = await getObras();
            setObras(obras);
            const response = await getDataHome();
            setDescription(response.description);
            setReforma(response.reform);
            setConstrucao(response.construction);
            setProjeto(response.project);
            setImagemPrincipal(response.imagemPrincipal);
        } catch (error) {
            toast({
                title: "Erro ao carregar dados",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const data = {
            description: description,
            reforma: reforma,
            construcao: construcao,
            projeto: projeto,
            imagemPrincipal: imagemPrincipal
        };
        
        try {
            setSaving(true);
            await sysValidation(async (token: string) => {
                await postHomeData(data, token);
                toast({
                    title: "Dados salvos com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            });
        } catch (error) {
            toast({
                title: "Erro ao salvar os dados!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text mt={4}>Carregando dados da página inicial...</Text>
            </Box>
        );
    }

    return (
        <Box>
            <VStack spacing={6} align="stretch">
                {/* Header */}
                <HStack justify="space-between" align="center">
                    <Box>
                        <Heading size="lg" mb={2}>Configuração da Página Inicial</Heading>
                        <Text color="gray.600">Gerencie o conteúdo exibido na homepage do site</Text>
                    </Box>
                    <Button
                        leftIcon={<FiSave />}
                        colorScheme="blue"
                        size="lg"
                        onClick={handleSave}
                        isLoading={saving}
                        loadingText="Salvando..."
                    >
                        Salvar Alterações
                    </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    {/* Main Content */}
                    <VStack spacing={6} align="stretch">
                        {/* Description */}
                        <Card bg={cardBg}>
                            <CardHeader>
                                <Heading size="md">Descrição Principal</Heading>
                            </CardHeader>
                            <CardBody>
                                <FormControl>
                                    <FormLabel>Texto de apresentação da empresa</FormLabel>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Descreva a empresa e seus valores..."
                                        rows={6}
                                        resize="vertical"
                                    />
                                </FormControl>
                            </CardBody>
                        </Card>

                        {/* Services Projects */}
                        <Card bg={cardBg}>
                            <CardHeader>
                                <Heading size="md">Projetos em Destaque</Heading>
                                <Text fontSize="sm" color="gray.600">
                                    Selecione obras para exibir na página inicial
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <FormControl>
                                        <FormLabel>Projeto de Reforma</FormLabel>
                                        <Select
                                            value={reforma?._id || ''}
                                            onChange={(e) => {
                                                const selected = obras.find(obra => obra._id === e.target.value);
                                                setReforma(selected);
                                            }}
                                            placeholder="Selecione um projeto de reforma"
                                        >
                                            {obras.map((obra) => (
                                                <option key={obra._id} value={obra._id}>
                                                    {obra.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Projeto de Construção</FormLabel>
                                        <Select
                                            value={construcao?._id || ''}
                                            onChange={(e) => {
                                                const selected = obras.find(obra => obra._id === e.target.value);
                                                setConstrucao(selected);
                                            }}
                                            placeholder="Selecione um projeto de construção"
                                        >
                                            {obras.map((obra) => (
                                                <option key={obra._id} value={obra._id}>
                                                    {obra.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Projeto Geral</FormLabel>
                                        <Select
                                            value={projeto?._id || ''}
                                            onChange={(e) => {
                                                const selected = obras.find(obra => obra._id === e.target.value);
                                                setProjeto(selected);
                                            }}
                                            placeholder="Selecione um projeto geral"
                                        >
                                            {obras.map((obra) => (
                                                <option key={obra._id} value={obra._id}>
                                                    {obra.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>

                    {/* Sidebar */}
                    <VStack spacing={6} align="stretch">
                        {/* Main Image */}
                        <Card bg={cardBg}>
                            <CardHeader>
                                <HStack justify="space-between">
                                    <Heading size="md">Imagem Principal</Heading>
                                    <Badge colorScheme={imagemPrincipal ? 'green' : 'gray'}>
                                        {imagemPrincipal ? 'Configurada' : 'Não definida'}
                                    </Badge>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4}>
                                    {imagemPrincipal && (
                                        <Image
                                            src={imagemPrincipal}
                                            alt="Imagem principal"
                                            maxH="200px"
                                            objectFit="cover"
                                            borderRadius="md"
                                            w="100%"
                                        />
                                    )}
                                    <SelectImages setImage={setImagemPrincipal} />
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Preview Selected Projects */}
                        <Card bg={cardBg}>
                            <CardHeader>
                                <Heading size="md">Projetos Selecionados</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={3} align="stretch">
                                    {reforma && (
                                        <HStack p={3} bg="orange.50" borderRadius="md">
                                            <Badge colorScheme="orange">Reforma</Badge>
                                            <Text fontSize="sm" flex={1}>{reforma.name}</Text>
                                        </HStack>
                                    )}
                                    {construcao && (
                                        <HStack p={3} bg="green.50" borderRadius="md">
                                            <Badge colorScheme="green">Construção</Badge>
                                            <Text fontSize="sm" flex={1}>{construcao.name}</Text>
                                        </HStack>
                                    )}
                                    {projeto && (
                                        <HStack p={3} bg="blue.50" borderRadius="md">
                                            <Badge colorScheme="blue">Projeto</Badge>
                                            <Text fontSize="sm" flex={1}>{projeto.name}</Text>
                                        </HStack>
                                    )}
                                    {!reforma && !construcao && !projeto && (
                                        <Text fontSize="sm" color="gray.500" textAlign="center">
                                            Nenhum projeto selecionado
                                        </Text>
                                    )}
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
}
