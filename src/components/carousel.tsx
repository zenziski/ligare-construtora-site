import { Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination]);

export default function ModalCarousel(props: any) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="720px"
            >
                <ModalCloseButton position="fixed" top="20px" size="lg" right="40px" zIndex={999999} />
                <ModalBody p={0} display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Swiper navigation pagination initialSlide={props.initialSlide} autoHeight={true}>
                        {props.images.map((element: any, index: number) => {
                            return (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <Image opacity={1} width="100%" height='100%' objectFit='cover' src={element} sx={{opacity: 1}} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
