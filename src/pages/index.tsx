import { getDataHome } from "@/_services/home.service";
import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Link, Text } from "@chakra-ui/react";

type Obras = {
  name: string,
  images: string[],
  slug: string
}

type HomeData = {
  imagemPrincipal: string,
  description: string,
  reforma: Obras,
  construcao: Obras,
  projeto: Obras
}

export default function Home({ data }: { data: HomeData }) {
  return (
    <Ligare image={data.imagemPrincipal} title="Página Inicial">
      <Flex mt="85px" justifyContent="center">
        <Text mb="85px" w="50%" align="center" fontFamily="Poppins-Medium" fontSize="24px">
          {data?.description}
        </Text>
      </Flex>
      <Flex alignItems="center" direction="column" gap={8} mb="100px">
        <Text as="h1" fontFamily="Poppins-Bold" fontSize="48px">O que nós fazemos</Text>
        <Flex direction="row" gap={8} flexWrap='wrap' justifyContent='center' >
          <ProjectCard title="Reforma" description={data.reforma.name} image={data.reforma.images[0]} slug={data.reforma.slug} />
          <ProjectCard title="Construção" description={data.construcao.name} image={data.construcao.images[0]} slug={data.construcao.slug} />
          <ProjectCard title="Projeto" description={data.projeto.name} image={data.projeto.images[0]} slug={data.projeto.slug} />
        </Flex>
        <Link href="/obras">
          <Text fontSize="32px" fontFamily="Poppins-Bold" className="underline-text" cursor="pointer">Ver mais obras</Text>
        </Link>
      </Flex>
    </Ligare>
  )
}

export const getServerSideProps = async ({ _req, res }: {_req: any, res: any}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )
  let response = await getDataHome();
  response = {
    description: response.description,
    reforma: response.reform,
    construcao: response.construction,
    projeto: response.project,
    imagemPrincipal: response.imagemPrincipal
  };
  return { props: { data: response } }
}
