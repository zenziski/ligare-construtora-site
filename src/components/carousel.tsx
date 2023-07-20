import { Box, Flex, Image, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Carousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images: string[] = [
        "./imgs/home1.jpg",
        "./imgs/home3.jpg",
        "./imgs/home2.jpg",
        "./imgs/home1.jpg",
        "./imgs/home3.jpg",
        "./imgs/home2.jpg",
        "./imgs/home1.jpg",
        "./imgs/home3.jpg",
        "./imgs/home2.jpg"
    ];

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
                {images.map((image, index) => (
                    <Box key={index} flex="0 0 33.33%" w='150px' m={2}>
                        <Image src={image} alt="carousel-image"  />
                    </Box>
                ))}
            </Flex>
            <IconButton
                aria-label="previous"
                icon={<ChevronLeftIcon />}
                onClick={handlePrev}
                position="absolute"
                top="50%"
                left="4"
                transform="translateY(-50%)"
                zIndex={1}
            />
            <IconButton
                aria-label="next"
                icon={<ChevronRightIcon />}
                onClick={handleNext}
                position="absolute"
                top="50%"
                right="2"
                transform="translateY(-50%)"
                zIndex={1}
            />
        </Box>
    );
}
