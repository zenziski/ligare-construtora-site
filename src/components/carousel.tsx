import { Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination]);

export default function ModalCarousel(props: any) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent
                maxW="900px" // Defina a largura máxima do modal como 900px
                m="auto" // Centralize o modal horizontalmente definindo margens automáticas
            >
                <ModalCloseButton position="fixed" top="20px" size="lg" right="40px" />
                <ModalBody p={0} display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Swiper navigation pagination style={{
                        "--swiper-pagination-color": "#FFBA08",
                        "--swiper-pagination-bullet-size": "10px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px"
                    }}>
                        {props.images.map((element: any) => {
                            return (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '500px' }}>
                                    <Image opacity={1} width="100%" height='100%' objectFit='cover' src={element} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
