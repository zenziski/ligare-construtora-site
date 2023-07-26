import { createSlug } from "@/utils/createSlug";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    slug?: string
}
export default function ProjectCard(props: ProjectCardProps) {
    const router = useRouter();
    const handlePage = (slug: string) => {
        router.push(`/obras/${slug}`);
    }
    return (
        <Flex direction="column" minW="400px" maxW="400px">
            <Box position="relative" h="300px">
                <Image
                    src={props.image}
                    alt={props.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    p={1}
                    _hover={{ opacity: "0.7", transition: "opacity 0.3s" }}
                    cursor="pointer"
                    onClick={() => handlePage(props.slug || createSlug(props.title) as string)}
                    loading="lazy"
                />
            </Box>
            <Box ml={1}>
                <Text fontSize="18px" fontFamily="Poppins-Medium">{props.title}</Text>
                <Text fontSize="14px" fontFamily="Poppins-Light">{props.description}</Text>
            </Box>

        </Flex>
    )
}
