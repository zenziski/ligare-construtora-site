import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Text } from "@chakra-ui/react";

export default function Projetos() {
    return (
        <Ligare image="./imgs/home2.jpg" title="Projetos">
            <Flex mt="85px" mb="85px" alignItems="center" direction="column" gap={6}>
                <Flex direction="row" gap={8}>
                    <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
                    <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
                    <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
                </Flex>
                <Flex direction="row" gap={8}>
                    <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
                    <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
                    <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
                </Flex>
                <Flex direction="row" gap={8}>
                    <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
                    <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
                    <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
                </Flex>
                <Flex direction="row" gap={8}>
                    <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
                    <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
                    <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
                </Flex>
                <Flex direction="row" gap={8}>
                    <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
                    <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
                    <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
                </Flex>
            </Flex>
        </Ligare>
    )
}
