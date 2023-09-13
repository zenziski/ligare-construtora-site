import { getAbout } from "@/_services/aboutus.service";
import Ligare from "@/components/Ligare";
import { Flex, Text, useBreakpointValue, Image } from "@chakra-ui/react";

type About = {
    whoWeAre: string,
    team: string,
    imagemPrincipal: string
}

export default function Projetos({ data }: {data: About}) {

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });
    return (
        <Ligare image="./imgs/home2.jpg" title="Sobre Nós">
            <Flex mt="45px" mb="85px" pl={10} pr={10} direction="row" gap={6} flexWrap={isLargeScreen ? 'nowrap' : 'wrap'}>
                <Flex direction="column" w="70%">
                    <Flex w="100%">
                        <Flex direction="column" alignItems="flex-start" w="100%">
                            <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize={isLargeScreen ? "64px" : "48px"} className="underline-text-heading-right">Quem somos</Text>
                            <Text w="80%" fontFamily="Poppins-Medium">{data.whoWeAre}</Text>
                        </Flex>
                    </Flex>
                    <Flex w="100%" mb="25px">
                        <Flex direction="column" alignItems="flex-start" w="100%">
                            <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize={isLargeScreen ? "64px" : "48px"} className="underline-text-heading-right">Time</Text>
                            <Text w="80%" fontFamily="Poppins-Medium">{data.team}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={data.imagemPrincipal} w={isLargeScreen ? "60%" : "100%"} />
            </Flex>
        </Ligare>
    )
}


export const getServerSideProps = async ({ _req, res }: { _req: any, res: any }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=30, stale-while-revalidate=59'
    )
    const data = await getAbout();

    return { props: { data } }
}

