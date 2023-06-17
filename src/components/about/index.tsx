
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Card, CardBody, Input, Button, useToast, Image, Box, Textarea } from "@chakra-ui/react"

export default function About() {
    return (
        <Wrapper title="Quem somos">
            <Box>
                <Text>
                    Texto de Descrição:
                </Text>
                <Textarea value='oii' />
                <Button mt={2}>Salvar</Button>
            </Box>
        </Wrapper>
    )

}