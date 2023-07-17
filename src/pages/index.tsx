import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Link, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Ligare image="/imgs/home1.jpg" title="Página Inicial">
      <Flex mt="85px" justifyContent="center">
        <Text mb="85px" w="50%" align="center" fontFamily="Poppins-Medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nemo quisquam aliquid ipsam accusantium quas distinctio nulla commodi consequatur laboriosam necessitatibus explicabo voluptatem eum ipsa earum, culpa, deleniti libero impedit illum ducimus, molestias tempora facere. Nemo rerum doloribus fugit non harum, ut ipsam voluptatem veniam cupiditate dicta nulla dolorum facilis facere, perferendis, ullam optio nisi labore ducimus magnam odio laborum repellat assumenda dolore. Praesentium animi facilis voluptatibus nihil aperiam, quos, numquam ex ipsam commodi at debitis. Odio exercitationem sint natus repudiandae eaque non ipsa consequatur fuga perferendis accusantium aperiam neque officiis unde, quos, harum, beatae quis quas ratione illo ipsum.
        </Text>
      </Flex>
      <Flex alignItems="center" direction="column" gap={8} mb="100px">
        <Text as="h1" fontFamily="Poppins-Bold" fontSize="32px">Projetos recentes</Text>
        <Flex direction="row" gap={8}>
          <ProjectCard title="Mahani" description="Engenharia" image="./imgs/home1.jpg" />
          <ProjectCard title="Capri" description="Arquitetura" image="./imgs/home2.jpg" />
          <ProjectCard title="Stephan" description="Arquitetura, Engenharia" image="./imgs/home3.jpg" />
        </Flex>
        <Link href="/projetos">
          <Text fontSize="24px" fontFamily="Poppins-Bold" className="underline-text" cursor="pointer">Ver mais projetos</Text>
        </Link>
      </Flex>

    </Ligare>
  )
}
