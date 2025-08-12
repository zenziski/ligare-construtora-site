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
  useColorModeValue,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tooltip,
  Textarea,
  ModalFooter,
  Divider
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { 
  FiMail, 
  FiSave, 
  FiImage, 
  FiSearch, 
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiFilter,
  FiDownload,
  FiPhone,
  FiUser,
  FiCalendar
} from 'react-icons/fi';
import SelectImages from "../home/modais/SelectImages";
import { useValidation } from '@/_hooks/useValidate';
import { 
  getContacts, 
  getContactImage, 
  postImageContact 
} from "@/_services/contact.service";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  createdAt?: string;
}

export default function ModernContacts() {
  const toast = useToast();
  const sysValidation = useValidation();
  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactImage, setContactImage] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const getData = async () => {
    try {
      setLoading(true);
      await sysValidation(async (token: string) => {
        const [contactsResponse, imageResponse] = await Promise.all([
          getContacts(token),
          getContactImage()
        ]);
        
        setContacts(contactsResponse || []);
        setContactImage(imageResponse?.data?.name || "");
      });
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os contatos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = async () => {
    try {
      setSaving(true);
      await sysValidation(async (token: string) => {
        const response = await postImageContact({ name: contactImage }, token);
        if (response) {
          toast({
            title: "Sucesso!",
            description: "Imagem da página de contato atualizada",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onImageModalClose();
        } else {
          throw new Error("Falha ao salvar");
        }
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a imagem",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'red';
      case 'read': return 'yellow';
      case 'replied': return 'green';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'read': return 'Lido';
      case 'replied': return 'Respondido';
      default: return 'Pendente';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = (contact.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.phone || "").includes(searchTerm);
    
    return matchesSearch
  });

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    onViewModalOpen();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <Box>
        <VStack spacing={6} align="stretch">
          <Skeleton height="40px" />
          <Card>
            <CardBody>
              <VStack spacing={4}>
                <Skeleton height="100px" />
                <Skeleton height="20px" />
              </VStack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Skeleton height="300px" />
            </CardBody>
          </Card>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="start" direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Box>
              <Heading size="lg" mb={2}>Gestão de Contatos</Heading>
              <Text color="gray.600">
                Gerencie mensagens recebidas e configurações da página de contato
              </Text>
            </Box>
            <Button
              leftIcon={<FiImage />}
              colorScheme="blue"
              variant="outline"
              onClick={onImageModalOpen}
              size={{ base: 'sm', md: 'md' }}
              w={{ base: 'full', md: 'auto' }}
            >
              Imagem da Página
            </Button>
          </HStack>
        </VStack>

        {/* Search and Filter */}
        <Card bg={cardBg}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4} direction={{ base: 'column', md: 'row' }}>
                <InputGroup flex={1}>
                  <InputLeftElement>
                    <FiSearch color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar por nome, email ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Contacts Table */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Heading size="md">Lista de Contatos</Heading>
              <Text fontSize="sm" color="gray.600">
                {filteredContacts.length} contato(s) encontrado(s)
              </Text>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            {filteredContacts.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <Box w="100%" display={{ base: 'none', md: 'block' }}>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th w="25%">Nome</Th>
                        <Th w="30%">Email</Th>
                        <Th w="15%">Telefone</Th>
                        <Th w="13%">Data</Th>
                        <Th w="5%">Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredContacts.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()).map((contact) => (
                        <Tr key={contact._id} _hover={{ bg: hoverBg }}>
                          <Td w="25%" maxW="0">
                            <HStack spacing={2}>
                              <Box w={6} h={6} bg="blue.100" borderRadius="full" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                                <FiUser color="blue.600" size={12} />
                              </Box>
                              <Text 
                                fontWeight="medium" 
                                fontSize="sm"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {contact.name || "Nome não informado"}
                              </Text>
                            </HStack>
                          </Td>
                          <Td w="30%" maxW="0">
                            <Text 
                              fontSize="sm" 
                              color="gray.600"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {contact.email || "Email não informado"}
                            </Text>
                          </Td>
                          <Td w="15%" maxW="0">
                            <Text 
                              fontSize="sm"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {contact.phone || "N/A"}
                            </Text>
                          </Td>
                          <Td w="13%" maxW="0">
                            <Text 
                              fontSize="xs" 
                              color="gray.600"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {formatDate(contact.createdAt)}
                            </Text>
                          </Td>
                          <Td w="5%">
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                variant="ghost"
                                size="xs"
                              />
                              <MenuList>
                                <MenuItem 
                                  icon={<FiEye />}
                                  onClick={() => handleViewContact(contact)}
                                  fontSize="sm"
                                >
                                  Ver
                                </MenuItem>
                                <MenuItem icon={<FiDownload />} fontSize="sm">
                                  Exportar
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                {/* Mobile Card View */}
                <VStack spacing={3} display={{ base: 'flex', md: 'none' }}>
                  {filteredContacts.map((contact) => (
                    <Card key={contact._id} w="100%" size="sm">
                      <CardBody p={4}>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between" align="start">
                            <HStack spacing={2} flex={1}>
                              <Box w={8} h={8} bg="blue.100" borderRadius="full" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                                <FiUser color="blue.600" size={14} />
                              </Box>
                              <VStack align="start" spacing={0} flex={1}>
                                <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                                  {contact.name || "Nome não informado"}
                                </Text>
                                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                                  {contact.email || "Email não informado"}
                                </Text>
                              </VStack>
                            </HStack>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                variant="ghost"
                                size="sm"
                              />
                              <MenuList>
                                <MenuItem 
                                  icon={<FiEye />}
                                  onClick={() => handleViewContact(contact)}
                                  fontSize="sm"
                                >
                                  Visualizar
                                </MenuItem>
                                <MenuItem icon={<FiDownload />} fontSize="sm">
                                  Exportar
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                          
                          <HStack justify="space-between">
                            <HStack spacing={2}>
                              {contact.phone && (
                                <Text fontSize="xs" color="gray.500">
                                  {contact.phone}
                                </Text>
                              )}
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              {formatDate(contact.createdAt)}
                            </Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </>
            ) : (
              <Box textAlign="center" py={10}>
                <FiMail size={48} color="gray.400" />
                <Text mt={4} fontSize="lg" color="gray.500">
                  {searchTerm || filterStatus !== "all" 
                    ? "Nenhum contato encontrado com os filtros aplicados" 
                    : "Nenhum contato recebido ainda"
                  }
                </Text>
                <Text fontSize="sm" color="gray.400" mt={2}>
                  {searchTerm || filterStatus !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Os contatos enviados pelo formulário do site aparecerão aqui"
                  }
                </Text>
              </Box>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Image Management Modal */}
      <Modal isOpen={isImageModalOpen} onClose={onImageModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurar Imagem da Página de Contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel fontWeight="semibold">Imagem de Fundo</FormLabel>
                <HStack spacing={4} align="start">
                  <SelectImages setImage={setContactImage} />
                  {contactImage && (
                    <Text fontSize="sm" color="green.600" fontWeight="medium">
                      ✓ Imagem selecionada
                    </Text>
                  )}
                </HStack>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Esta imagem será exibida como fundo na página de contato do site
                </Text>
              </FormControl>
              
              {contactImage ? (
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                    Prévia da imagem:
                  </Text>
                  <Image
                    src={contactImage}
                    alt="Imagem da página de contato"
                    maxH="300px"
                    w="100%"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid"
                    borderColor={borderColor}
                  />
                </Box>
              ) : (
                <Box
                  textAlign="center"
                  py={8}
                  color="gray.500"
                  border="2px dashed"
                  borderColor={borderColor}
                  borderRadius="md"
                >
                  <FiImage size={48} />
                  <Text mt={2}>Nenhuma imagem selecionada</Text>
                  <Text fontSize="sm">Use o botão acima para selecionar uma imagem</Text>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onImageModalClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSaveImage}
              isLoading={saving}
              loadingText="Salvando..."
              leftIcon={<FiSave />}
            >
              Salvar Imagem
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Contact Modal */}
      <Modal isOpen={isViewModalOpen} onClose={onViewModalClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Box w={10} h={10} bg="blue.100" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                <FiUser color="blue.600" size={20} />
              </Box>
              <Box>
                <Text>{selectedContact?.name || "Nome não informado"}</Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedContact && (
              <VStack spacing={6} align="stretch">
                <HStack spacing={6}>
                  <Card flex={1}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <FiMail color="gray.500" />
                          <Text fontSize="sm" fontWeight="medium">Email</Text>
                        </HStack>
                        <Text>{selectedContact.email || "Email não informado"}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  <Card flex={1}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <FiPhone color="gray.500" />
                          <Text fontSize="sm" fontWeight="medium">Telefone</Text>
                        </HStack>
                        <Text>{selectedContact.phone || "Não informado"}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </HStack>

                <Card>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack>
                        <FiCalendar color="gray.500" />
                        <Text fontSize="sm" fontWeight="medium">Data de Recebimento</Text>
                      </HStack>
                      <Text>{formatDate(selectedContact.createdAt)}</Text>
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.600">Mensagem</Text>
                      <Box 
                        p={4} 
                        bg={useColorModeValue('gray.50', 'gray.700')} 
                        borderRadius="md"
                        w="100%"
                      >
                        <Text whiteSpace="pre-wrap">
                          {selectedContact.description || "Nenhuma mensagem foi enviada."}
                        </Text>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onViewModalClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
