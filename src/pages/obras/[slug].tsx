import { getObrasById } from "@/_services/obras.service";
import Ligare from "@/components/Ligare";
import { Flex, Text, Image, useBreakpointValue, Grid, Link, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalCarousel from "@/components/carousel";

export default function Projeto() {
    const [obra, setObra] = useState<any>(null)
    const [initialSlide, setInitalSlide] = useState<number>(0)
    const router = useRouter();
    const { slug } = router.query;

    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleOpenModal = () => {
        onOpen()
    }

    const getData = async () => {
        const result = await getObrasById(slug as string)
        setObra(result)
    }

    useEffect(() => {
        if (slug) getData()
    }, [slug])

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    return (
        obra && <Ligare image={obra.mainImage ? obra.mainImage : obra.images[0]} title="Projeto" text={obra.name.toLocaleUpperCase()} page="obra">
            <Flex mb="85px" direction="column" gap={6} p="10px" pt="15px">
                {
                    !isLargeScreen ? (
                        <Grid templateColumns={isLargeScreen ? "repeat(4, 1fr)" : "repeat(1, 1fr)"} gap={4} w="100%" h="100%">
                            {obra.images?.map((element: any, index: any) => (
                                <Image _hover={{ cursor: 'pointer', opacity: 0.8 }} transition="opacity 0.3s" onClick={() => {
                                    setInitalSlide(index)
                                    handleOpenModal()
                                }} src={element} w="100%" h="240px" key={index} loading="lazy" objectFit={'cover'} />
                            ))}
                        </Grid>
                    ) : (
                        <Flex gap={4} w="100%" h="100%" flexWrap={'wrap'}>
                            {obra.images?.map((element: any, index: any) => (
                                <Image _hover={{ cursor: 'pointer', opacity: 0.8 }} transition="opacity 0.3s" onClick={() => {
                                    setInitalSlide(index)
                                    handleOpenModal()
                                }} src={element} w="auto" h="240px" key={index} loading="lazy" objectFit={'contain'} />
                            ))}
                        </Flex>
                    )
                }

                <Text as="h1" fontFamily="Oswald-Bold" fontSize={isLargeScreen ? "48px" : "32px"}>Ficha técnica</Text>
                <Flex direction="column" gap={1}>
                    <Text fontFamily="Oswald-Bold" fontSize="24px">{obra.name}</Text>
                    <Text fontFamily="Oswald-Regular"><b>Tipo:</b> {obra.type === 'construcao' ? "Construção" : obra.type === 'reforma' ? "Reforma" : "Projeto"}</Text>
                    {obra.data.length ? (
                        obra.data.map((data: any) => {
                            return (
                                <Flex direction="column">
                                    <Text fontFamily="Oswald-Regular"><b>{data.campo}:</b> {data.valor}</Text>
                                </Flex>
                            )
                        })
                    ) : (null)}
                    {
                        obra.type === 'projeto' && obra.vinculo && (
                            <Flex w="100%" mt="15px">
                                <Link href={`/obras/${obra?.vinculo?.slug}`}>
                                    <Text fontFamily="Poppins-Medium" fontSize="18px" className="underline-text">Ver obra pronta</Text>
                                </Link>
                            </Flex>
                        )
                    }
                </Flex>
            </Flex>
            {
                isOpen ? (
                    <ModalCarousel
                        isOpen={isOpen}
                        onClose={onClose}
                        title={'Galeria'}
                        images={obra.images}
                        initialSlide={initialSlide}
                    />
                ) : null
            }

        </Ligare >
    )
}
