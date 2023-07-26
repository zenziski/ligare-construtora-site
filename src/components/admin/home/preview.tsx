import { Flex, Image, Text, Heading, Button } from '@chakra-ui/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination]);

interface SliderProps {
    images: string[],
    title: string,
    description: string
}

export default function HomePreview(props: SliderProps) {

    console.log(props.images);


    return (

        <Flex justifyContent='center' alignItems='center'>
            <Flex maxWidth='1120px'  >
                <Swiper navigation pagination>
                    {
                        props.images.map((image: any) => {
                            return (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Flex width='350px' color='white' zIndex={10} position='absolute' flexDirection='column' alignItems='center' >
                                        <Heading>{props.title}</Heading>
                                        <Text>{props.description}</Text>
                                        <Button mt={10} bgColor='yellow.500' >Serviços</Button>
                                    </Flex>
                                    <Image src={image} width='100%' />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Flex>
        </Flex>




    )
}