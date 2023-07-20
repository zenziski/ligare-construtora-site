import { getObrasById } from "@/_services/obras.service";
import Ligare from "@/components/Ligare";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Text, Image, useBreakpointValue, Box, SimpleGrid, IconButton, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Projeto() {
    const [obra, setObra] = useState<any>(null)
    const router = useRouter();
    const { slug } = router.query;
    const [mosaicElement, setMosaicElement] = useState<any>(null)

    const getData = async () => {
        const result = await getObrasById(slug as string)
        setObra(result)
    }

    useEffect(() => {
        if (slug) getData()
    }, [slug])
    const getRandomNumber = (min: any, max: any) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Generate random mosaic elements with random width and height
    const generateRandomMosaicElements = (count: number, minWidth: number, maxWidth: number, minHeight: number, maxHeight: number) => {
        const elements = [];
        for (let i = 0; i < count; i++) {
            const width = getRandomNumber(minWidth, maxWidth) * 0.5;
            const height = getRandomNumber(minHeight, maxHeight) * 0.5;
            elements.push({ width, height, content: obra.images[i] });
        }
        return elements;
    };

    useEffect(() => {
        if (obra) {
            const elements = generateRandomMosaicElements(obra.images.length, 1, 1.2, 1.2, 1.2);
            setMosaicElement(elements)
        }
    }, [obra])

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    return (
        obra && <Ligare image={obra.images[0]} title="Projeto">
            <Flex mb="85px" direction="column" gap={6} p="40px">
                <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-right">Ficha técnica</Text>
                <Flex direction="column">
                    <Text fontFamily="Poppins-Regular"><b>Nome da obra:</b> {obra.name}</Text>
                    <Text fontFamily="Poppins-Regular"><b>Tipo:</b> {obra.type === 'construcao' ? "Construção" : obra.type === 'reforma' ? "Reforma" : "Projeto"}</Text>
                    {obra.data.length ? (
                        obra.data.map((data: any) => {
                            return (
                                <Flex direction="column">
                                    <Text fontFamily="Poppins-Regular"><b>{data.campo}:</b> {data.valor}</Text>
                                </Flex>
                            )
                        })
                    ) : (null)}

                </Flex>
                <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%" h="30%" gridAutoFlow="dense">
                    {mosaicElement?.map((element: any, index: any) => (
                        <Box
                            key={index}
                            gridColumn={`span ${element.width}`}
                            gridRow={`span ${element.height}`}
                        >
                            <Image src={element.content} w="100%" h="100%" objectFit="cover" />
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </Ligare>
    )
}
