import { Flex, Text } from "@chakra-ui/react"
interface IWrapperProps {
    children: any,
    title: string
}
export const Wrapper = (props: IWrapperProps) => {
    return (
        <Flex direction="column" p="0" flexGrow="1" flexShrink="1" mr="30px" pt="30px" height="100%" gap={4} alignItems="stretch">
            <Flex flexDirection="column" height="100%">
                <Flex flexDirection="row" justifyContent="space-between" borderBottom="1px" borderBottomColor="gray.300" pb={4} mb={4}>
                    <Text fontSize="20px" mt={8} fontFamily="Poppins-Medium">{props.title}</Text>
                </Flex>
                <Flex w="100%" bg="gray.50" p={4} direction="column" justifyContent="stretch" borderRadius="10px" boxShadow="0px 0px 5px 0px rgba(0,0,0,0.20)">
                    {props.children}
                </Flex>
            </Flex>
        </Flex>
    )
} 