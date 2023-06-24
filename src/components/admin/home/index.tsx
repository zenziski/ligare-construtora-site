
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Card, CardBody, Input, Button, useToast, Image, Box } from "@chakra-ui/react"
import SelectImages from "./modais/SelectImages"
import { useEffect, useState } from "react";

export default function Home() {

    const [refresh, setRefresh] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            console.log('atualizou as imagens');

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setRefresh(false)
        fetchData()
    }, [refresh])

    return (
        <Wrapper title="Home">
            <Flex>
                <SelectImages flushHook={setRefresh} />
            </Flex>
            <Box>
                Imagens carrosel
            </Box>
        </Wrapper>
    )
}