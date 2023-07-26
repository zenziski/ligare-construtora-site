import { Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination]);

interface ModalSliderGalleryProps {
    location: string;
    name: string;
    images: { location: string; name: string; }[];
    initial: number;
}

export default function Slider({ location, name, images, initial }: ModalSliderGalleryProps) {

    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>

            <Image
                transition="opacity 0.3s"
                _hover={{ opacity: 0.5 }}
                src={location}
                alt={name}
                h="150px" w="100%"
                onClick={onOpen}
                cursor='pointer'
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Galeria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Swiper navigation pagination initialSlide={initial}>
                            {
                                images.map((image) => (
                                    <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image width='600px' height='400px' src={image.location} alt={image.name} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
