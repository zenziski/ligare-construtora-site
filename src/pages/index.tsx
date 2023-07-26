import { getDataHome } from "@/_services/home.service";
import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  const getData = async () => {
    const response = await getDataHome();
    setData({
      description: response.description,
      reforma: response.reform,
      construcao: response.construction,
      projeto: response.project,
      imagemPrincipal: response.imagemPrincipal
    });
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    data && <Ligare image={data.imagemPrincipal} title="Página Inicial">
      <Flex mt="85px" justifyContent="center">
        <Text mb="85px" w="50%" align="center" fontFamily="Poppins-Medium">
          {data?.description}
        </Text>
      </Flex>
      <Flex alignItems="center" direction="column" gap={8} mb="100px">
        <Text as="h1" fontFamily="Poppins-Bold" fontSize="32px">O que nós fazemos</Text>
        <Flex direction="row" gap={8} flexWrap='wrap' justifyContent='center' >
          <ProjectCard title="Reforma" description={data.reforma.name} image={data.reforma.images[0]} slug={data.reforma.slug} />
          <ProjectCard title="Construção" description={data.construcao.name} image={data.construcao.images[0]} slug={data.construcao.slug} />
          <ProjectCard title="Projeto" description={data.projeto.name} image={data.projeto.images[0]} slug={data.projeto.slug} />
        </Flex>
        <Link href="/obras">
          <Text fontSize="24px" fontFamily="Poppins-Bold" className="underline-text" cursor="pointer">Ver mais obras</Text>
        </Link>
      </Flex>

    </Ligare>
  )
}
