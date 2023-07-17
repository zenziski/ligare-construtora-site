import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Box, Flex, Grid, Text, Wrap, WrapItem } from "@chakra-ui/react";

export default function Projetos() {
    return (
        <Ligare image="./imgs/home2.jpg" title="Sobre Nós">
            <Flex mt="85px" mb="85px" alignItems="center" direction="column" gap={6}>
                <Flex w="100%">
                    <Flex direction="column" alignItems="flex-end" w="100%">
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-right">Quem somos</Text>
                        <Text w="60%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                </Flex>
                <Flex w="100%" mb="25px">
                    <Flex ml="100px" direction="column" alignItems="flex-start" w="60%">
                        <Text as="h1" fontFamily="Poppins-Bold" p={4} fontSize="64px" className="underline-text-heading-left">Equipe</Text>
                        <Text w="90%" fontFamily="Poppins-Medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quod libero beatae nobis accusamus aperiam fugiat numquam, nesciunt pariatur incidunt quis error harum odio voluptas voluptatibus mollitia sapiente? Consequuntur non dolor odit debitis unde aliquid ea, doloremque voluptas ipsam modi incidunt, optio vel possimus quia natus necessitatibus sit. Dolorem, excepturi?</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Ligare>
    )
}
