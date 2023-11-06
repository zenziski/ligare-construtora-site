import { getDataHome } from "@/_services/home.service";
import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Link, Text, Image } from "@chakra-ui/react";

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
    data && (
      <Ligare image={data.imagemPrincipal} title="Página Inicial" text="LIGARE" page="home">
        <Flex mt="85px" alignItems="center" direction="column">
          <Text fontFamily="Oswald-Bold" fontSize="48px" mb={10} id="sobre-nos">QUEM SOMOS?</Text>
          <Text mb="30px" w="80%" align="center" fontFamily="Poppins-Light" fontWeight="bold" fontSize="24px">
            {data?.description}
          </Text>
          <Image src="./imgs/logo_text.png" w="150px" h="150px" mb={20} />
        </Flex>
        <Flex alignItems="center" direction="column" gap={8} mb="100px">
          <Text as="h1" fontFamily="Oswald-Bold" fontSize="48px">O QUE FAZEMOS?</Text>
          <Flex direction="row" gap={8} flexWrap='wrap' justifyContent='center' >
            <ProjectCard title="Reforma" description={data.reforma.name} image={data.reforma.images[0]} slug={data.reforma.slug} />
            <ProjectCard title="Construção" description={data.construcao.name} image={data.construcao.images[0]} slug={data.construcao.slug} />
            <ProjectCard title="Projeto" description={data.projeto.name} image={data.projeto.images[0]} slug={data.projeto.slug} />
          </Flex>
          <Link href="/obras">
            <Text
              p={4}
              borderRadius="40px"
              fontSize="32px"
              fontFamily="Oswald-Bold"
              cursor="pointer"
              background="primary"
            >
              VEJA MAIS OBRAS
            </Text>
          </Link>
        </Flex>
      </Ligare>
    )
  )
}

export const getServerSideProps = async ({ _req, res }: { _req: any, res: any }) => {
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
