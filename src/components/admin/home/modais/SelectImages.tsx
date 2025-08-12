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
  AlertDescription
} from "@chakra-ui/react";
import { FiImage, FiSearch, FiCheck } from 'react-icons/fi';
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";
import PaginationComponent from "@/components/Pagination";

interface SelectImagesProps {
  setImage: (imageUrl: string) => void;
}

export default function SelectImages({ setImage }: SelectImagesProps) {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
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
        setImages(response.files || []);
        setTotal(response.totalFiles || 0);
      });
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (location: string) => {
    setSelectedImage(selectedImage === location ? "" : location);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSave = () => {
    if (selectedImage) {
      setImage(selectedImage);
      onClose();
      setSelectedImage("");
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedImage("");
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
        leftIcon={<FiImage />}
        onClick={onOpen} 
        colorScheme="blue" 
        variant="outline"
        size="md"
      >
        Selecionar Imagem
      </Button>

      <Modal size="4xl" isOpen={isOpen} onClose={handleClose} scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent maxH="90vh" h={{ base: "95vh", md: "90vh" }}>
          <ModalHeader flexShrink={0}>
            <VStack align="start" spacing={2}>
              <HStack>
                <FiImage />
                <Text>Selecionar Imagem da Galeria</Text>
              </HStack>
              <HStack spacing={4}>
                <Badge colorScheme="blue" variant="subtle">
                  {total} imagens disponíveis
                </Badge>
                {selectedImage && (
                  <Badge colorScheme="green" variant="subtle">
                    1 imagem selecionada
                  </Badge>
                )}
              </HStack>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody flex={1} overflowY="auto">
            <VStack spacing={6} align="stretch" h="100%">
              {/* Search */}
              <Box flexShrink={0}>
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
                      {filteredImages.map((image: any, index: number) => (
                        <Card 
                          key={`${currentPage}-${index}`}
                          cursor="pointer"
                          onClick={() => handleSelectImage(image.location)}
                          bg={cardBg}
                          border="2px solid"
                          borderColor={selectedImage === image.location ? selectedBorderColor : borderColor}
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
                                {selectedImage === image.location && (
                                  <Box
                                    position="absolute"
                                    top={2}
                                    right={2}
                                    bg="blue.500"
                                    color="white"
                                    borderRadius="full"
                                    w={6}
                                    h={6}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <FiCheck size={14} />
                                  </Box>
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
                      ))}
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
                isDisabled={!selectedImage}
                leftIcon={<FiCheck />}
              >
                Selecionar Imagem
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}   