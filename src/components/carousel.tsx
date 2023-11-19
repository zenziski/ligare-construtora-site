import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Button } from "@chakra-ui/react";
import React from "react";
import SwiperCore, { Navigation, Pagination, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination, Keyboard]);

export default function ModalCarousel(props: any) {
    const swiperRef = React.useRef<any>(null);

    const goNext = () => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="720px"
                margin={'auto'}
            >
                <ModalCloseButton position="fixed" top="20px" size="lg" right="40px" zIndex={999999} />
                <ModalBody p={0} display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Swiper ref={swiperRef} pagination initialSlide={props.initialSlide} autoHeight={true} style={{ position: 'relative' }} keyboard={{ enabled: true }}>
                        {props.images.map((element: any, index: number) => {
                            return (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <Image opacity={1} width="100%" height='100%' objectFit='cover' src={element} sx={{ opacity: 1 }} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <Box position="fixed" left="500px" top="50%" transform="translateY(-50%)">
                        <Button onClick={goPrev} bg={'rgba(0, 0, 0, 0.0)'} _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}><ChevronLeftIcon w={20} h={20}/></Button>
                    </Box>
                    <Box position="fixed" right="500px" top="50%" transform="translateY(-50%)">
                        <Button onClick={goNext} bg={'rgba(0, 0, 0, 0.0)'} _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}><ChevronRightIcon w={20} h={20}/></Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
