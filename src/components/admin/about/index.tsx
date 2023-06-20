
import { useState, useEffect } from "react";
import { Wrapper } from "@/components/wrapper"
import { Flex, Text, Card, CardBody, Input, Button, useToast, Image, Box, Textarea } from "@chakra-ui/react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RichTextEditor from "@/components/RichTextEditor";


export default function About() {

    const [content, setContent] = useState('');

    const handleContentChange = (newContent: any) => {
        setContent(newContent);
    };

    useEffect(() => {
        console.log(content);
    }, [content])

    return (
        <Flex direction='column' width='100%' >
            <Wrapper title="Quem somos">
                <Box>
                    <Text>
                        Texto de Descrição:
                    </Text>
                    <RichTextEditor
                        value={content} onChange={handleContentChange}
                    />
                </Box>
            </Wrapper>
            <Box>
                <Text dangerouslySetInnerHTML={{ __html: content }} />

            </Box>
        </Flex>

    )

}