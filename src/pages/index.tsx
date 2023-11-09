import { getDataHome } from "@/_services/home.service";
import Ligare from "@/components/Ligare";
import ProjectCard from "@/components/ProjectCard";
import { Flex, Link, Text, Image } from "@chakra-ui/react";

type Obras = {
  name: string,
  images: string[],
  slug: string
  mainImage?: string
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
          <Flex w="65%" direction="column" alignItems="center">
            <Text align="center" fontFamily="Poppins-Light" fontWeight="bold" fontSize="24px">
              A Ligare Construtora tem uma história de mais de 10 anos atuando no mercado  de construção e reforma em Curitiba e região.
            </Text>
            <Text align="center" fontFamily="Poppins-Light" fontWeight="bold" fontSize="24px">
              Buscamos apresentar soluções completas para a sua obra residencial ou comercial e por isso oferecemos além da execução e gestão de obra, os serviços de elaboração, gestão e consultoria para projetos arquitetônicos e complementares.
            </Text>
            <Text mb="30px" align="center" fontFamily="Poppins-Light" fontWeight="bold" fontSize="24px">
              Somos obstinados em trazer para os nossos clientes soluções viáveis e racionais durante toda a obra, além de prezar pela transparência de todos os nossos processos.
            </Text>
            <Text align="center" fontFamily="Poppins-Light" fontWeight="bold" fontSize="24px">
              Você é o centro da sua própria obra e participará de todas das tomadas de decisões, além de receber reportes periódicos e ter acesso ao controle financeiro a qualquer momento.
            </Text>
          </Flex>
          <Image src="./imgs/logo_text.png" w="150px" h="150px" mb={20} />
        </Flex>
        <Flex alignItems="center" direction="column" gap={8} mb="100px">
          <Text as="h1" fontFamily="Oswald-Bold" fontSize="48px">O QUE FAZEMOS?</Text>
          <Flex direction="row" gap={8} flexWrap='wrap' justifyContent='center' >
            <ProjectCard showDescription title="Reforma" description={data.reforma.name} image={data.reforma.mainImage || data.reforma.images[0]} slug={data.reforma.slug} />
            <ProjectCard showDescription title="Construção" description={data.construcao.name} image={data.construcao.mainImage || data.construcao.images[0]} slug={data.construcao.slug} />
            <ProjectCard showDescription title="Projeto" description={data.projeto.name} image={data.projeto.mainImage || data.projeto.images[0]} slug={data.projeto.slug} />
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
