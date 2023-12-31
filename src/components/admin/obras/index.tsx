
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Card, CardBody, Image, Grid, GridItem, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import NovaObra from "./modais/NovaObra";
import { getObras } from "@/_services/obras.service";
import EditObra from "./modais/EditObra";
import DeleteObra from "./modais/DeleteObra";
import EditCover from "./modais/EditCover";

export default function Obras() {
    const [obras, setObras] = useState<any[]>([])
    const [, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const getData = async () => {
        setIsLoading(true)
        const data = await getObras()
        setObras(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (refresh) getData();
        setRefresh(false)
    }, [refresh])

    const ShowCards = (props: any) => {
        return (
            <Flex gap={4}>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={4} w="100%">
                    {obras.length && obras.filter(item => item.type === props.type).sort((a: any, b: any) => a.ordem - b.ordem).map((obra: any) => (
                        <GridItem>
                            <Card key={obra.id} mt={4}>
                                <CardBody>
                                    <Flex>
                                        <Image src={obra.mainImage ? obra.mainImage : obra.images[0]} width="250px" height="250px" />
                                        <Flex ml={4} direction="column" fontFamily="Poppins-Regular">
                                            <Text fontSize="2xl" fontWeight="bold">{obra.name}</Text>
                                            <Text>Slug: {obra.slug}</Text>
                                            <Text>Tipo: {obra.type}</Text>
                                            <Text>Ordem: {obra.ordem}</Text>
                                            <Flex gap={4} mt="10px" alignItems="center">
                                                <EditObra flushook={setRefresh} data={obra} todasObras={obras} />
                                                <DeleteObra flushook={setRefresh} data={obra} />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>
            </Flex>
        )
    }
    return (
        <Wrapper title="Obras">
            <Flex mt={4} width='100%' direction="column">
                <Flex>
                    <NovaObra flushook={setRefresh} todasObras={obras} />
                    <EditCover />

                </Flex>
                <Accordion allowMultiple mt={4}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text fontFamily="Poppins-Medium" fontSize="24px" p={4}>Reforma</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <ShowCards type="reforma" />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text fontFamily="Poppins-Medium" fontSize="24px" p={4}>Construção</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <ShowCards type="construcao" />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text fontFamily="Poppins-Medium" fontSize="24px" p={4}>Projeto</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <ShowCards type="projeto" />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Flex>
        </Wrapper>
    )
}