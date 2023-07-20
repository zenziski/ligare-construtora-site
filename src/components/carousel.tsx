import { Box, Flex, Image, IconButton, Link } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Carousel(props: any) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = props.obras.map((obra: any) => obra.images[0])

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box maxH="500px" mx="auto" position="relative" overflow="hidden">
            <Flex
                transform={`translateX(-${currentImageIndex * 34.33}%)`}
                transition="transform 0.3s ease-in-out"
            >
                {props.obras.map((obra: any, index: any) => (
                    <Box key={index} flex="0 0 33.33%" w='250px' m={2}>
                        <Link href={`/obras/${obra.slug}`}>
                            <Image src={obra.images[0]} alt="carousel-image" cursor="pointer" _hover={{ opacity: 0.8, transition: "opacity 0.3s ease"}} />
                        </Link>
                    </Box>
                ))}
            </Flex>
            <ChevronLeftIcon
                h="100px"
                w="120px"
                onClick={handlePrev}
                position="absolute"
                top="50%"
                left="-20px"
                cursor="pointer"
                transform="translateY(-50%)"
                zIndex={1}
            />
            <ChevronRightIcon
                h="100px"
                w="120px"
                onClick={handleNext}
                position="absolute"
                top="50%"
                right="-25px"
                cursor="pointer"
                transform="translateY(-50%)"
                zIndex={1}
            />
        </Box>
    );
}
