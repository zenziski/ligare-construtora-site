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
  Image,
  Badge,
  useColorModeValue,
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Flex
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiPlus, FiSearch, FiImage } from 'react-icons/fi';
import { MdConstruction } from 'react-icons/md';
import NovaObra from "./modais/NovaObra";
import { getObras } from "@/_services/obras.service";
import EditObra from "./modais/EditObra";
import DeleteObra from "./modais/DeleteObra";
import EditCover from "./modais/EditCover";

export default function ModernObras() {
    const [obras, setObras] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getObras();
            setObras(data);
        } catch (error) {
            console.error('Erro ao carregar obras:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (refresh) {
            getData();
            setRefresh(false);
        }
    }, [refresh]);

    // Filter obras based on search and type
    const filteredObras = obras.filter(obra => {
        const matchesSearch = obra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            obra.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || obra.type === selectedType;
        return matchesSearch && matchesType;
    });

    // Group obras by type
    const obrasByType = {
        reforma: obras.filter(obra => obra.type === 'reforma'),
        construcao: obras.filter(obra => obra.type === 'construcao'),
        projeto: obras.filter(obra => obra.type === 'projeto')
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

    const ObraCard = ({ obra }: { obra: any }) => (
        <Card 
            bg={cardBg} 
            border="1px" 
            borderColor={borderColor} 
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} 
            transition="all 0.2s"
            role="group"
        >
            <CardBody p={0}>
                <Box position="relative">
                    <Image
                        src={obra.mainImage || obra.images?.[0]}
                        alt={obra.name}
                        height="200px"
                        width="100%"
                        objectFit="cover"
                        borderTopRadius="md"
                    />
                    {/* Badge overlay */}
                    <Badge
                        position="absolute"
                        top={3}
                        left={3}
                        colorScheme={getTypeColor(obra.type)}
                    >
                        {getTypeLabel(obra.type)}
                    </Badge>
                </Box>
                <Box p={4}>
                    <VStack align="start" spacing={2}>
                        <HStack justify="space-between" w="100%" align="start">
                            <Heading size="md" noOfLines={1} flex={1}>{obra.name}</Heading>
                            {/* Action buttons in card body */}
                            <HStack spacing={1}>
                                <EditObra flushook={setRefresh} data={obra} todasObras={obras} />
                                {/* <EditCover flushook={setRefresh} data={obra} /> */}
                                <DeleteObra flushook={setRefresh} data={obra} />
                            </HStack>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">Slug: {obra.slug}</Text>
                        <HStack justify="space-between" w="100%">
                            <Text fontSize="sm" color="gray.600">
                                Ordem: {obra.ordem}
                            </Text>
                            <HStack spacing={1}>
                                <FiImage size={14} />
                                <Text fontSize="sm" color="gray.600">
                                    {obra.images?.length || 0}
                                </Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </Box>
            </CardBody>
        </Card>
    );

    if (loading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text mt={4}>Carregando obras...</Text>
            </Box>
        );
    }

    return (
        <Box>
            <VStack spacing={6} align="stretch">
                {/* Header */}
                <HStack justify="space-between" align="center">
                    <Box>
                        <Heading size="lg" mb={2}>Gerenciar Obras</Heading>
                        <Text color="gray.600">
                            {obras.length} projeto(s) cadastrado(s)
                        </Text>
                    </Box>
                    <NovaObra flushook={setRefresh} todasObras={obras} />
                </HStack>

                {/* Search and Filters */}
                <HStack spacing={4} wrap="wrap">
                    <InputGroup maxW="400px">
                        <InputLeftElement pointerEvents="none">
                            <FiSearch />
                        </InputLeftElement>
                        <Input
                            placeholder="Buscar por nome ou slug..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </HStack>

                {/* Tabs for different categories */}
                <Tabs variant="enclosed" onChange={(index) => {
                    const types = ['all', 'reforma', 'construcao', 'projeto'];
                    setSelectedType(types[index]);
                }}>
                    <TabList>
                        <Tab>Todas ({obras.length})</Tab>
                        <Tab>Reformas ({obrasByType.reforma.length})</Tab>
                        <Tab>Construções ({obrasByType.construcao.length})</Tab>
                        <Tab>Projetos ({obrasByType.projeto.length})</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                                {filteredObras
                                    .sort((a, b) => a.ordem - b.ordem)
                                    .map((obra) => (
                                        <ObraCard key={obra._id} obra={obra} />
                                    ))}
                            </SimpleGrid>
                            {filteredObras.length === 0 && (
                                <Flex justify="center" py={10}>
                                    <Text color="gray.500">Nenhuma obra encontrada</Text>
                                </Flex>
                            )}
                        </TabPanel>
                        
                        {['reforma', 'construcao', 'projeto'].map((type) => (
                            <TabPanel key={type} px={0}>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                                    {obrasByType[type as keyof typeof obrasByType]
                                        .filter(obra => 
                                            obra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            obra.slug.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .sort((a, b) => a.ordem - b.ordem)
                                        .map((obra) => (
                                            <ObraCard key={obra._id} obra={obra} />
                                        ))}
                                </SimpleGrid>
                                {obrasByType[type as keyof typeof obrasByType].length === 0 && (
                                    <Flex justify="center" py={10}>
                                        <Text color="gray.500">Nenhuma obra do tipo {getTypeLabel(type)} encontrada</Text>
                                    </Flex>
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </VStack>
        </Box>
    );
}
