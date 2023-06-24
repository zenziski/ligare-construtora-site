import { Box } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }: any) => {
    const handleChange = (content: any) => {
        onChange(content);
    };

    return (
        <Box>
            <ReactQuill
                value={value}
                onChange={handleChange}
            />
        </Box>
    );
};

export default RichTextEditor;