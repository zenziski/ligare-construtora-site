import { createSlug } from "@/utils/createSlug";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
}
export default function ProjectCard(props: ProjectCardProps) {
    const router = useRouter();
    const handlePage = (slug: string) => {
        router.push(`/projetos/${slug}`);
    }
    return (
        <Flex direction="column" w="430px">
            <Image src={props.image} w="100%" _hover={{ opacity: "0.7", transition: "opacity 0.3s", }} cursor="pointer"
                onClick={() => handlePage(createSlug(props.title) as string)}
            />
            <Text fontSize="18px" fontFamily="Poppins-Medium">{props.title}</Text>
            <Text fontSize="14px" fontFamily="Poppins-Light">{props.description}</Text>
        </Flex>
    )
}
