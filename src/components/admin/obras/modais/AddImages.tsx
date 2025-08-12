import { useEffect, useState } from "react";
import { 
  Button, 
  Image, 
  Card, 
  CardBody,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure, 
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  AlertDescription,
  Checkbox
} from "@chakra-ui/react";
import { FiImage, FiSearch, FiPlus, FiCheck } from 'react-icons/fi';
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";
import PaginationComponent from "@/components/Pagination";

interface AddImagesProps {
  setImages: (imageUrls: string[]) => void;
}

export default function AddImages({ setImages }: AddImagesProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImagesData] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const perPage = 21;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sysValidation = useValidation();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.300');

  const handleImages = async () => {
    try {
      setLoading(true);
      await sysValidation(async (token: string) => {
        const response = await getImages(currentPage, token);
        setImagesData(response.files || []);
        setTotal(response.totalFiles || 0);
      });
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (location: string) => {
    if (selectedImages.includes(location)) {
      setSelectedImages(selectedImages.filter((item: string) => item !== location));
    } else {
      setSelectedImages([...selectedImages, location]);
    }
  };

  const handleSelectAll = () => {
    const allImageLocations = filteredImages.map(img => img.location);
    if (selectedImages.length === allImageLocations.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(allImageLocations);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSave = () => {
    setImages(selectedImages);
    onClose();
    setSelectedImages([]);
  };

  const handleClose = () => {
    onClose();
    setSelectedImages([]);
    setSearchTerm("");
    setCurrentPage(0);
  };

  const filteredImages = images.filter(image => 
    image.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      handleImages();
    }
  }, [isOpen, currentPage]);

  return (
    <>
      <Button 
        leftIcon={<FiPlus />}
        onClick={onOpen} 
        colorScheme="blue" 
        variant="outline"
        size="md"
      >
        Adicionar Imagens
      </Button>

      <Modal size="4xl" isOpen={isOpen} onClose={handleClose} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent maxH="90vh" h={{ base: "95vh", md: "90vh" }}>
          <ModalHeader flexShrink={0}>
            <VStack align="start" spacing={2}>
              <HStack>
                <FiImage />
                <Text>Adicionar Imagens da Galeria</Text>
              </HStack>
              <HStack spacing={4}>
                <Badge colorScheme="blue" variant="subtle">
                  {total} imagens disponíveis
                </Badge>
                {selectedImages.length > 0 && (
                  <Badge colorScheme="green" variant="subtle">
                    {selectedImages.length} imagem(ns) selecionada(s)
                  </Badge>
                )}
              </HStack>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody flex={1} overflowY="auto">
            <VStack spacing={6} align="stretch" h="100%">
              {/* Search and Select All */}
              <Box flexShrink={0}>
                <VStack spacing={4} align="stretch">
                  <InputGroup>
                    <InputLeftElement>
                      <FiSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Buscar por nome da imagem..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  
                  {filteredImages.length > 0 && (
                    <HStack justify="flex-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSelectAll}
                        leftIcon={<FiCheck />}
                      >
                        {selectedImages.length === filteredImages.length ? "Desmarcar Todas" : "Selecionar Todas"}
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </Box>

              {/* Images Grid */}
              <Box flex={1} minH={0}>
                {loading ? (
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <Skeleton key={index} height="200px" borderRadius="md" />
                    ))}
                  </SimpleGrid>
                ) : filteredImages.length > 0 ? (
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 4, xl: 5 }} spacing={4}>
                      {filteredImages.map((image: any, index: number) => {
                        const isSelected = selectedImages.includes(image.location);
                        return (
                          <Card 
                            key={`${currentPage}-${index}`}
                            cursor="pointer"
                            onClick={() => handleSelectImage(image.location)}
                            bg={cardBg}
                            border="2px solid"
                            borderColor={isSelected ? selectedBorderColor : borderColor}
                            _hover={{ 
                              borderColor: selectedBorderColor,
                              transform: 'translateY(-2px)',
                              boxShadow: 'lg'
                            }}
                            transition="all 0.2s"
                            position="relative"
                            maxW="100%"
                          >
                            <CardBody p={2}>
                              <VStack spacing={2}>
                                <Box position="relative" w="100%">
                                  <Image
                                    src={image.location}
                                    alt={image.name || "Imagem da galeria"}
                                    width="100%"
                                    height={{ base: "120px", sm: "140px", md: "150px" }}
                                    objectFit="cover"
                                    borderRadius="md"
                                  />
                                  
                                  {/* Selection indicator */}
                                  <Box
                                    position="absolute"
                                    top={2}
                                    right={2}
                                  >
                                    <Checkbox
                                      isChecked={isSelected}
                                      onChange={() => handleSelectImage(image.location)}
                                      size="lg"
                                      colorScheme="blue"
                                      bg="white"
                                      borderRadius="md"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </Box>

                                  {/* Selection overlay */}
                                  {isSelected && (
                                    <Box
                                      position="absolute"
                                      inset={0}
                                      bg="blue.500"
                                      opacity={0.2}
                                      borderRadius="md"
                                      pointerEvents="none"
                                    />
                                  )}
                                </Box>
                                <Text 
                                  fontSize="xs" 
                                  color="gray.600" 
                                  textAlign="center"
                                  noOfLines={2}
                                  lineHeight="1.2"
                                >
                                  {image.name || "Sem nome"}
                                </Text>
                              </VStack>
                            </CardBody>
                          </Card>
                        );
                      })}
                    </SimpleGrid>

                    {/* Pagination */}
                    <Box flexShrink={0}>
                      <PaginationComponent
                        currentPage={currentPage}
                        totalPages={Math.ceil(total / perPage)}
                        onPageChange={handlePageChange}
                      />
                    </Box>
                  </VStack>
                ) : (
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <AlertDescription>
                      {searchTerm 
                        ? `Nenhuma imagem encontrada para "${searchTerm}"`
                        : "Nenhuma imagem disponível na galeria"
                      }
                    </AlertDescription>
                  </Alert>
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter flexShrink={0}>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handleSave}
                isDisabled={selectedImages.length === 0}
                leftIcon={<FiPlus />}
              >
                Adicionar {selectedImages.length > 0 ? `(${selectedImages.length})` : ""} Imagem{selectedImages.length !== 1 ? "ns" : ""}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}