'use client'
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardBody,
  Image,
  Checkbox,
  VStack,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Skeleton,
  Badge,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { FiSearch, FiTrash2, FiEye } from 'react-icons/fi';
import { useValidation } from "@/_hooks/useValidate";
import { getImages, deleteImages } from "@/_services/galery.service";
import AddFile from "./modais/AddFile";
import PaginationComponent from "@/components/Pagination";

export default function ModernGallery() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);
  const toast = useToast();
  const sysValidation = useValidation();
  
  const perPage = 24;
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const fetchImages = async () => {
    try {
      setLoading(true);
      await sysValidation(async (token: string) => {
        const response = await getImages(currentPage, token);
        setImages(response.files);
        setTotal(response.totalFiles);
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar imagens',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedImages.length === images.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(images.map((img: any) => img._id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await sysValidation(async (token: string) => {
        await deleteImages(selectedImages, token);
        toast({
          title: 'Imagens deletadas com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setSelectedImages([]);
        setRefreshTrigger(prev => !prev);
      });
    } catch (error) {
      toast({
        title: 'Erro ao deletar imagens',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const filteredImages = images.filter((img: any) =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchImages();
  }, [currentPage, refreshTrigger]);

  return (
    <Box>
      {/* Header with Actions */}
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" wrap="wrap">
          <Box>
            <Badge colorScheme="blue" fontSize="md" p={2}>
              {total} imagens no total
            </Badge>
            {selectedImages.length > 0 && (
              <Badge colorScheme="orange" fontSize="md" p={2} ml={2}>
                {selectedImages.length} selecionadas
              </Badge>
            )}
          </Box>
          
          <HStack spacing={3}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <FiSearch />
              </InputLeftElement>
              <Input
                placeholder="Buscar imagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <AddFile flushHook={setRefreshTrigger} />
            
            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="red"
              variant="outline"
              isDisabled={selectedImages.length === 0}
              onClick={onOpen}
            >
              Deletar ({selectedImages.length})
            </Button>
          </HStack>
        </HStack>

        {/* Bulk Actions */}
        {images.length > 0 && (
          <HStack>
            <Checkbox
              isChecked={selectedImages.length === images.length && images.length > 0}
              isIndeterminate={selectedImages.length > 0 && selectedImages.length < images.length}
              onChange={handleSelectAll}
            >
              Selecionar todas visíveis
            </Checkbox>
          </HStack>
        )}

        {/* Images Grid */}
        {loading ? (
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {Array(12).fill(0).map((_, i) => (
              <Card key={i} bg={cardBg}>
                <CardBody>
                  <Skeleton height="200px" />
                  <Skeleton height="20px" mt={4} />
                </CardBody>
              </Card>
            ))}
          </Grid>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {filteredImages.map((image: any, index: number) => (
              <Card
                key={image._id}
                bg={cardBg}
                border="2px solid"
                borderColor={selectedImages.includes(image._id) ? 'blue.500' : borderColor}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
              >
                <CardBody p={0} position="relative">
                  <Box position="relative">
                    <Image
                      src={image.location}
                      alt={image.name}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                      borderTopRadius="md"
                    />
                    
                    {/* Overlay with actions */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="blackAlpha.600"
                      opacity={0}
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderTopRadius="md"
                    >
                      <HStack>
                        <IconButton
                          aria-label="Visualizar"
                          icon={<FiEye />}
                          colorScheme="white"
                          variant="ghost"
                          color="white"
                        />
                      </HStack>
                    </Box>
                    
                    {/* Selection checkbox */}
                    <Checkbox
                      position="absolute"
                      top={3}
                      right={3}
                      isChecked={selectedImages.includes(image._id)}
                      onChange={() => handleSelectImage(image._id)}
                      bg="white"
                      borderRadius="md"
                    />
                  </Box>
                  
                  <Box p={4}>
                    <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                      {image.name}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {!loading && total > perPage && (
          <Box display="flex" justifyContent="center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(total / perPage)}
              onPageChange={setCurrentPage}
            />
          </Box>
        )}
      </VStack>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Imagens
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar {selectedImages.length} imagem(ns)? 
              Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteSelected} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
