"use client";
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
  useColorModeValue,
  FormControl,
  FormHelperText,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as React from "react";
import { FiUsers, FiSave, FiImage } from "react-icons/fi";
import SelectImages from "../home/modais/SelectImages";
import { useValidation } from "@/_hooks/useValidate";
import { getAbout, postAbout } from "@/_services/aboutus.service";

export default function ModernAbout() {
  const toast = useToast();
  const sysValidation = useValidation();
  const [imagemPrincipal, setImagemPrincipal] = useState<string>("");
  const [whoWeAre, setWhoWeAre] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAbout();
      setImagemPrincipal(response.imagemPrincipal || "");
      setWhoWeAre(response.whoWeAre || "");
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as informações",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await sysValidation(async (token: string) => {
        const response = await postAbout({ imagemPrincipal, whoWeAre }, token);
        if (response) {
          toast({
            title: "Sucesso!",
            description: "Informações sobre a empresa atualizadas",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          throw new Error("Falha ao salvar");
        }
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const isFormValid = () => {
    return whoWeAre.trim().length > 0;
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
                <Skeleton height="300px" />
                <Skeleton height="20px" />
              </VStack>
            </CardBody>
          </Card>
          <HStack spacing={6}>
            <Card flex={1}>
              <CardBody>
                <Skeleton height="200px" />
              </CardBody>
            </Card>
          </HStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" mb={2}>
              Sobre a Empresa
            </Heading>
            <Text color="gray.600">
              Gerencie as informações institucionais da Ligare
            </Text>
          </Box>
          <Button
            leftIcon={<FiSave />}
            colorScheme="blue"
            onClick={handleSave}
            isLoading={saving}
            loadingText="Salvando..."
            isDisabled={!isFormValid()}
          >
            Salvar Alterações
          </Button>
        </HStack>

        {/* Alert for unsaved changes */}
        {(whoWeAre || imagemPrincipal) && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Dica!</AlertTitle>
              <AlertDescription>
                Lembre-se de salvar suas alterações após editar as informações.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Main Image Card */}
        <Card bg={cardBg}>
          <CardHeader pb={3}>
            <HStack spacing={3}>
              <FiImage />
              <Heading size="md">Imagem Principal</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel fontWeight="semibold">Imagem de Destaque</FormLabel>
                <HStack spacing={4} align="start">
                  <SelectImages setImage={setImagemPrincipal} />
                  {imagemPrincipal && (
                    <Text fontSize="sm" color="green.600" fontWeight="medium">
                      ✓ Imagem selecionada
                    </Text>
                  )}
                </HStack>
                <FormHelperText>
                  Esta imagem será exibida na página "Sobre Nós" do site
                </FormHelperText>
              </FormControl>

              {imagemPrincipal ? (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    color="gray.600"
                  >
                    Prévia da imagem:
                  </Text>
                  <Image
                    src={imagemPrincipal}
                    alt="Imagem principal sobre nós"
                    maxH="400px"
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
                  <Text fontSize="sm">
                    Use o botão acima para selecionar uma imagem
                  </Text>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Content Card */}
        <Card bg={cardBg}>
          <CardHeader pb={3}>
            <HStack spacing={3}>
              <FiUsers />
              <Heading size="md">Quem Somos</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">
                  Descrição da Empresa
                </FormLabel>
                <Textarea
                  value={whoWeAre}
                  onChange={(e) => setWhoWeAre(e.currentTarget.value)}
                  placeholder="Descreva a história, missão e valores da empresa..."
                  size="md"
                  minH="200px"
                  resize="vertical"
                />
                <FormHelperText>
                  {whoWeAre.length}/1000 caracteres
                </FormHelperText>
              </FormControl>

              {whoWeAre.length > 0 && (
                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    color="gray.600"
                  >
                    Prévia do texto:
                  </Text>
                  <Box
                    p={4}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text fontSize="sm" noOfLines={4}>
                      {whoWeAre}
                    </Text>
                  </Box>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Summary Card */}
        <Card
          bg={cardBg}
          borderColor={isFormValid() ? "green.200" : "orange.200"}
        >
          <CardBody>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Status das Informações</Text>
                <HStack spacing={4} fontSize="sm">
                  <Text color={imagemPrincipal ? "green.600" : "orange.600"}>
                    {imagemPrincipal ? "✓" : "⚠"} Imagem:{" "}
                    {imagemPrincipal ? "Selecionada" : "Não selecionada"}
                  </Text>
                  <Text color={whoWeAre.trim() ? "green.600" : "red.600"}>
                    {whoWeAre.trim() ? "✓" : "✗"} Quem Somos:{" "}
                    {whoWeAre.trim() ? "Preenchido" : "Obrigatório"}
                  </Text>
                </HStack>
              </VStack>
              <Button
                leftIcon={React.createElement(FiSave)}
                colorScheme={isFormValid() ? "blue" : "gray"}
                onClick={handleSave}
                isLoading={saving}
                loadingText="Salvando..."
                isDisabled={!isFormValid()}
                size="lg"
              >
                Salvar Alterações
              </Button>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}
