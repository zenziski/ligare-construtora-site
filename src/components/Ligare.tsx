import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { PageHead } from "./PageHead";

export default function Ligare(props: any) {
    return (
        <Flex direction="column">
            <PageHead title={props.title} />
            <Header image={props.image} />
            {props.children}
            <Footer />
        </Flex>
    )
}
