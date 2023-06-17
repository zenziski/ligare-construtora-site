
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Card, CardBody, Input, Button, useToast, Image, Box } from "@chakra-ui/react"

export default function Carousel() {
    return (
        <Wrapper title="Carrossel">
            <Box>
                <Text>
                    Imagens do carrosel <Button>Editar</Button>
                </Text>
                <Box>
                    Imagens carrosel
                </Box>
            </Box>
        </Wrapper>
    )

}