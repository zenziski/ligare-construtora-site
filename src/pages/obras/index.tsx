import Ligare from "@/components/Ligare";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Carousel from "@/components/carousel";
import { useEffect, useState } from "react";
import { getObras } from "@/_services/obras.service";

export default function Projetos() {
    const [obras, setObras] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const getData = async () => {
        setIsLoading(true)
        const data = await getObras()
        setObras(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const justifyCenter = useBreakpointValue({ base: true, lg: false });

    return (
        obras.length && <Ligare image="./imgs/home2.jpg" title="Projetos">
            <Flex mt="85px" mb="85px" alignItems="center" direction="column" gap={6} flexWrap='wrap'>
                <Flex direction="column" gap={8} flexWrap='wrap' alignItems={justifyCenter ? "center" : "initial"}>
                    {obras.filter((obra) => obra.type === 'reforma').length ? (
                        <Flex direction="column">
                            <Text fontFamily="Poppins-Medium" fontSize="4xl" fontWeight="bold">Reformas</Text>
                            <Carousel obras={obras.filter((obra) => obra.type === 'reforma')} />
                        </Flex>
                    ) : (null)}
                    {obras.filter((obra) => obra.type === 'construcao').length ? (
                        <Flex direction="column">
                            <Text fontFamily="Poppins-Medium" fontSize="4xl" fontWeight="bold">Construções</Text>
                            <Carousel obras={obras.filter((obra) => obra.type === 'construcao')} />
                        </Flex>
                    ) : (null)}
                    {obras.filter((obra) => obra.type === 'projeto').length ? (
                        <Flex direction="column">
                            <Text fontFamily="Poppins-Medium" fontSize="4xl" fontWeight="bold">Projetos</Text>
                            <Carousel obras={obras.filter((obra) => obra.type === 'projeto')} />
                        </Flex>
                    ) : (null)}
                </Flex>
            </Flex>
        </Ligare>
    )
}
