import Ligare from "@/components/Ligare";
import { Flex, Text, Image, useBreakpointValue, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Projeto() {
    const router = useRouter();
    const { slug } = router.query;
    const image = slug === 'stephan' ? '/imgs/home3.jpg' : slug === 'capri' ? '/imgs/home2.jpg' : '/imgs/home1.jpg';
    const images = {
        stephan: [
            { location: '/imgs/home3.jpg', name: 'Imagem 1' },
            { location: '/imgs/home3.jpg', name: 'Imagem 2' },
            { location: '/imgs/home3.jpg', name: 'Imagem 3' },
            { location: '/imgs/home3.jpg', name: 'Imagem 4' },
        ],
        capri: [
            { location: '/imgs/home2.jpg', name: 'Imagem 1' },
            { location: '/imgs/home2.jpg', name: 'Imagem 2' },
            { location: '/imgs/home2.jpg', name: 'Imagem 3' },
            { location: '/imgs/home2.jpg', name: 'Imagem 4' },
        ],
        mahani: [
            { location: '/imgs/home1.jpg', name: 'Imagem 1' },
            { location: '/imgs/home1.jpg', name: 'Imagem 2' },
            { location: '/imgs/home1.jpg', name: 'Imagem 3' },
            { location: '/imgs/home1.jpg', name: 'Imagem 4' },
        ]
    }

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    return (
        slug && <Ligare image={image} title="Projeto">
            <Flex mt="85px" mb="85px" direction="column" gap={6}>
                <Flex w="100%" flexWrap="wrap">
                    <Image src={image} w="100%" maxW={isLargeScreen ? "30%" : "100%"} ml={isLargeScreen ? "100px" : 0} mb={isLargeScreen ? 0 : "20px"} />
                    <Flex direction="column" alignItems={isLargeScreen ? "flex-end" : 'center'} w={isLargeScreen ? "60%" : '100%'}>
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-right">Projeto</Text>
                        <Text w="90%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                </Flex>
                <Flex w="100%" mb="25px" flexWrap='wrap'>
                    <Flex ml={isLargeScreen ? "100px" : 0} mb={isLargeScreen ? 0 : "20px"} direction="column" alignItems={isLargeScreen ? "flex-start" : 'center'} w={isLargeScreen ? "55%" : '100%'}>
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize={isLargeScreen ? "64px" : '50px'} className="underline-text-heading-left" >Inspirações</Text>
                        <Text w="90%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                    <Image src={image} w={isLargeScreen ? '28%' : '100%'} mr="100px" />
                </Flex>
                <Flex w="100%" direction="row" pl={isLargeScreen ? "100px" : '5px'} pr={isLargeScreen ? "100px" : '5px'} gap={4} flexWrap={isLargeScreen ? 'nowrap' : 'wrap'} >
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "20%" : '100%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "50%" : '45%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "30%" : '45%'} />
                </Flex>
                <Flex w="100%" direction="row" pl={isLargeScreen ? "100px" : '5px'} pr={isLargeScreen ? "100px" : '5px'} gap={4} flexWrap={isLargeScreen ? 'nowrap' : 'wrap'}>
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "50%" : '100%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "30%" : '45%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "20%" : '45%'} />
                </Flex>
                <Flex w="100%" direction="row" pl={isLargeScreen ? "100px" : '5px'} pr={isLargeScreen ? "100px" : '5px'} gap={4} flexWrap={isLargeScreen ? 'nowrap' : 'wrap'}>
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "30%" : '100%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "20%" : '45%'} />
                    <Image src={images[slug as keyof typeof images][0].location} w={isLargeScreen ? "50%" : '45%'} />
                </Flex>
            </Flex>
        </Ligare>
    )
}
 