import { useState, useRef, useEffect } from "react"
import { Flex, Text, Card, Input, Button, useToast, Image, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Checkbox, Grid, GridItem, CardHeader, CardBody } from "@chakra-ui/react"
import MiniLoading from "@/components/miniLoading"
import { Wrapper } from "@/components/wrapper";
import Axios from 'axios';
import { AddIcon } from '@chakra-ui/icons'
import ModalCancel from "@/components/admin/galery/modais/DeleteImages";
import Slider from "@/components/admin/galery/modais/Slider";
import AddFile from "./modais/AddFile";
import DeleteImages from "./modais/DeleteImages";

export default function Galery() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [galeryImages, setGaleryImages] = useState([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedGaleryImages, setSelectedGaleryImages] = useState<any>([])
    const toast = useToast();

    const fetchData = async () => {
        try {
            const { data } = await Axios.get('http://localhost:3001/upload')
            setGaleryImages(data.files)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectImages = (_id: string) => {
        if (selectedGaleryImages.includes(_id)) {
            setSelectedGaleryImages(selectedGaleryImages.filter((item: string) => item !== _id))
        } else {
            setSelectedGaleryImages([...selectedGaleryImages, _id])
        }
    }

    useEffect(() => {
        setSelectedGaleryImages([]);
        fetchData()
    }, [refresh])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Wrapper title="Galeria">
            <Flex padding={2} flexDirection='column' gap={4}>
                <Flex direction="row" justifyContent="flex-end" w="100%" gap={2}>
                    <AddFile flushHook={setRefresh} />
                    <DeleteImages flushHook={setRefresh} imagesToDelete={selectedGaleryImages} />
                </Flex>
                <Flex flexWrap='wrap'>
                    <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(7, 1fr)' }} gap={6}>
                        {
                            galeryImages.length && galeryImages.map((image: any, index: number) => {
                                return (
                                    <GridItem key={index}>
                                        <Card display='flex' alignItems='center' justify='center' height='225px' width='225px' >
                                            <CardHeader w="100%" display="flex" justifyContent="flex-end">
                                                <Checkbox isChecked={selectedGaleryImages.includes(image._id)} onChange={() => handleSelectImages(image._id)} />
                                            </CardHeader>
                                            <CardBody>
                                                <Flex >
                                                    <Slider location={image.location} name={image.name} images={galeryImages} initial={index} />
                                                </Flex>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                )
                            })
                        }
                    </Grid>
                </Flex>
            </Flex>
        </Wrapper>
    )
}