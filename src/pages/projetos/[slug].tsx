import Ligare from "@/components/Ligare";
import Slider from "@/components/admin/galery/modais/Slider";
import { Flex, Text, Image } from "@chakra-ui/react";
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
    return (
        <Ligare image={image} title="Projeto">
            <Flex mt="85px" mb="85px" direction="column" gap={6}>
                <Flex w="100%">
                    <Image src={image} w="30%" ml="100px" />
                    <Flex direction="column" alignItems="flex-end" w="60%">
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-right">Projeto</Text>
                        <Text w="90%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                </Flex>
                <Flex w="100%" mb="25px">
                    <Flex ml="100px" direction="column" alignItems="flex-start" w="60%">
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-left">Inspirações</Text>
                        <Text w="90%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                    <Image src={image} w="30%" mr="100px" />
                </Flex>
                <Flex w="100%" direction="row" pl="100px" pr="100px" gap={4}>
                    <Image src={images[slug as keyof typeof images][0].location} w="20%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="50%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="30%" />
                </Flex>
                <Flex w="100%" direction="row" pl="100px" pr="100px" gap={4}>
                    <Image src={images[slug as keyof typeof images][0].location} w="50%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="30%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="20%" />
                </Flex>
                <Flex w="100%" direction="row" pl="100px" pr="100px" gap={4}>
                    <Image src={images[slug as keyof typeof images][0].location} w="30%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="20%" />
                    <Image src={images[slug as keyof typeof images][0].location} w="50%" />
                </Flex>
            </Flex>
        </Ligare>
    )
}
