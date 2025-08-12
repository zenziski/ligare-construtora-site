'use client'
import { 
  Box, 
  SimpleGrid, 
  Card, 
  CardBody, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  HStack,
  Heading
} from "@chakra-ui/react";
import { FiImage, FiHome, FiUsers, FiMail } from 'react-icons/fi';
import { MdConstruction } from 'react-icons/md';

export default function Dashboard() {
    const cardBg = useColorModeValue('white', 'gray.800');
    const statBg = useColorModeValue('gray.50', 'gray.700');

    const stats = [
        {
            label: 'Total de Imagens',
            value: '245',
            help: '+12 este mês',
            icon: FiImage,
            color: 'blue'
        },
        {
            label: 'Projetos Ativos',
            value: '8',
            help: '2 novos',
            icon: MdConstruction,
            color: 'green'
        },
        {
            label: 'Contatos Recebidos',
            value: '34',
            help: '+5 esta semana',
            icon: FiMail,
            color: 'purple'
        },
        {
            label: 'Visualizações do Site',
            value: '1,247',
            help: '+23% vs mês anterior',
            icon: FiUsers,
            color: 'orange'
        }
    ];

    return (
        <Box>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Heading size="lg" mb={2}>Dashboard</Heading>
                    <Text color="gray.600">Bem-vindo ao painel administrativo da Ligare</Text>
                </Box>

                {/* Stats Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {stats.map((stat, index) => (
                        <Card key={index} bg={cardBg}>
                            <CardBody>
                                <HStack spacing={4}>
                                    <Box
                                        p={3}
                                        bg={statBg}
                                        borderRadius="lg"
                                    >
                                        <Icon as={stat.icon} boxSize={6} color={`${stat.color}.500`} />
                                    </Box>
                                    <Stat>
                                        <StatLabel fontSize="sm" color="gray.600">
                                            {stat.label}
                                        </StatLabel>
                                        <StatNumber fontSize="2xl" fontWeight="bold">
                                            {stat.value}
                                        </StatNumber>
                                        <StatHelpText fontSize="sm" color="gray.500">
                                            {stat.help}
                                        </StatHelpText>
                                    </Stat>
                                </HStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>

                {/* Quick Actions */}
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    <Card bg={cardBg}>
                        <CardBody>
                            <VStack align="start" spacing={4}>
                                <Heading size="md">Ações Rápidas</Heading>
                                <VStack align="stretch" spacing={2}>
                                    <Text fontSize="sm" color="blue.500" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                                        → Adicionar novas imagens à galeria
                                    </Text>
                                    <Text fontSize="sm" color="blue.500" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                                        → Gerenciar projetos de obras
                                    </Text>
                                    <Text fontSize="sm" color="blue.500" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                                        → Responder contatos pendentes
                                    </Text>
                                    <Text fontSize="sm" color="blue.500" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                                        → Atualizar informações da empresa
                                    </Text>
                                </VStack>
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg}>
                        <CardBody>
                            <VStack align="start" spacing={4}>
                                <Heading size="md">Atividade Recente</Heading>
                                <VStack align="stretch" spacing={3}>
                                    <HStack>
                                        <Box w={2} h={2} bg="green.500" borderRadius="full" />
                                        <Text fontSize="sm">5 novas imagens adicionadas</Text>
                                        <Text fontSize="xs" color="gray.500" ml="auto">2h atrás</Text>
                                    </HStack>
                                    <HStack>
                                        <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                                        <Text fontSize="sm">Projeto "Residencial Solar" atualizado</Text>
                                        <Text fontSize="xs" color="gray.500" ml="auto">1d atrás</Text>
                                    </HStack>
                                    <HStack>
                                        <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                                        <Text fontSize="sm">3 novos contatos recebidos</Text>
                                        <Text fontSize="xs" color="gray.500" ml="auto">2d atrás</Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </CardBody>
                    </Card>
                </SimpleGrid>
            </VStack>
        </Box>
    );
}
