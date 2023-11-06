import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { PageHead } from "./PageHead";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
    hidden: { opacity: 0, x: -400, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -400 },
}

type Props = {
    children: ReactNode
    title: string,
    image: string,
    text: string
    page: string
}

export default function Ligare(props: Props) {
    return (
        <Flex direction="column">
            <PageHead title={props.title} />
            <Header image={props.image} text={props.text} page={props.page} />
            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: 'ease-in-out' }}
            >
                {props.children}
            </motion.main>
            <Footer />
        </Flex>
    )
}
