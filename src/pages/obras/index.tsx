import Ligare from "@/components/Ligare";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getObras } from "@/_services/obras.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ProjectCard from "@/components/ProjectCard";


export default function Projetos() {
    const [obras, setObras] = useState<any[]>([])
    const [, setIsLoading] = useState(false);
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

    const Carrossel = (props: any) => {
        return (
            <Flex direction="column">
                <Text as="h1" fontFamily="Poppins-Bold" p={6} fontSize="32px" className="underline-text-heading-right" fontWeight="bold">{props.type === 'construcao' ? "Construção" : props.type === 'reforma' ? "Reforma" : "Projeto"}</Text>
                <Flex h="100%" maxW={justifyCenter ? "360px" : "1280px"} >
                    <Swiper direction="horizontal" slidesPerView={justifyCenter ? 1 : 3} navigation={true} spaceBetween={10} modules={[Navigation]}>
                        {props.obras.filter((obra: any) => obra.type === props.type).map((obra: any) => {
                            return (
                                <SwiperSlide key={obra._id} style={{ minWidth: '360px' }}  >
                                    <ProjectCard title={obra.name} description={props.type === 'construcao' ? "Construção" : props.type === 'reforma' ? "Reforma" : "Projeto"} image={obra.mainImage ? obra.mainImage : obra.images[0]} slug={obra.slug} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Flex>
            </Flex>
        )
    }
    return (
        obras.length && <Ligare image="./imgs/home2.jpg" title="Projetos">
            <Flex mt="85px" mb="85px" alignItems="center" direction="column" gap={6} flexWrap='wrap'>
                <Flex direction="column" gap={8} flexWrap='wrap' alignItems={justifyCenter ? "center" : "initial"}>
                    {obras.filter((obra) => obra.type === 'construcao').length ? (
                        <Carrossel obras={obras} type="construcao" />
                    ) : (null)}
                    {obras.filter((obra) => obra.type === 'reforma').length ? (
                        <Carrossel obras={obras} type="reforma" />
                    ) : (null)}
                    {obras.filter((obra) => obra.type === 'projeto').length ? (
                        <Carrossel obras={obras} type="projeto" />
                    ) : (null)}
                </Flex>
            </Flex>
        </Ligare>
    )
}
