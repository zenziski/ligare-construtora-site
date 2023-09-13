import Ligare from "@/components/Ligare";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { getObras } from "@/_services/obras.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ProjectCard from "@/components/ProjectCard";
import { getDataHome } from "@/_services/home.service";

type Obra = {
    _id: string,
    type: string,
    name: string,
    mainImage: string,
    images: string[],
    slug: string,
    ordem: number
}

export default function Projetos({ coverImage, obras }: { coverImage: string, obras: Obra[] }) {

    const justifyCenter = useBreakpointValue({ base: true, lg: false });

    const Carrossel = (props: { type: string, obras: Obra[] }) => {
        return (
            <Flex direction="column">
                <Text as="h1" fontFamily="Poppins-Bold" p={6} fontSize="32px" className="underline-text-heading-right" fontWeight="bold">{props.type === 'construcao' ? "Construção" : props.type === 'reforma' ? "Reforma" : "Projeto"}</Text>
                <Flex h="100%" maxW={justifyCenter ? "360px" : "1280px"} >
                    <Swiper direction="horizontal" slidesPerView={justifyCenter ? 1 : props.obras.filter((obra: Obra) => obra.type === props.type).length >= 3 ? 3 : props.obras.filter((obra: Obra) => obra.type === props.type).length} navigation={true} spaceBetween={6} modules={[Navigation]}>
                        {props.obras.filter((obra: Obra) => obra.type === props.type).sort((a: Obra, b: Obra) => a.ordem - b.ordem).map((obra: Obra) => {
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
        <Ligare image={coverImage ? coverImage : "./imgs/home2.jpg"} title="Projetos">
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


export const getServerSideProps = async ({ req, res }: { req: any, res: any }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=30, stale-while-revalidate=59'
    )
    const { capaObras } = await getDataHome();
    const obras = await getObras()
    return { props: { obras, capaObras } }
}
