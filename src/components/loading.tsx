import { Flex } from "@chakra-ui/react";
import ReactLoading from "react-loading";

export default function LoadingComponent() {
  return (
    <Flex backgroundColor="gray.200" flexDirection="row" justifyContent="center" alignItems="center" borderRadius={5} mt={8} p={12}>
      <ReactLoading type="spin" color="#0263FF" />
    </Flex>
  )
}