import { useState, useEffect } from "react"
import { Flex, Card, Checkbox, Grid, GridItem, CardHeader, CardBody } from "@chakra-ui/react"
import { Wrapper } from "@/components/wrapper";
import Slider from "@/components/admin/galery/modais/Slider";
import AddFile from "./modais/AddFile";
import DeleteImages from "./modais/DeleteImages";
import { getImages } from "@/_services/galery.service";
import { useValidation } from "@/_hooks/useValidate";
import PaginationComponent from "@/components/Pagination";

export default function Galery() {
    const [, setIsLoading] = useState<boolean>(false);
    const [galeryImages, setGaleryImages] = useState([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedGaleryImages, setSelectedGaleryImages] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0)
    const perPage = 10;
    const sysValidation = useValidation();

    const fetchData = async () => {
        try {
            await sysValidation(async (token: string) => {
                setIsLoading(true);
                const response = await getImages(currentPage, token)
                setGaleryImages(response.files)
                setTotal(response.totalFiles)
                setIsLoading(false);
            });
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
    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        setRefresh(false);
        setSelectedGaleryImages([]);
        fetchData()
    }, [refresh, currentPage])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(galeryImages)
    }, [galeryImages])

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
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={Math.ceil(total / perPage)}
                    onPageChange={handlePageChange}
                />
            </Flex>
        </Wrapper>
    )
}