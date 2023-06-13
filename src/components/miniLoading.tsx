import { Flex } from "@chakra-ui/react";
import ReactLoading from "react-loading";

interface IMiniloadingProps {
  color?: string;
  size?: number;
}

export default function MiniLoading(props: IMiniloadingProps) {
  return (
    <Flex flexDirection="row" justifyContent="center" alignItems="center" p={4}>
      <ReactLoading type="spin" color={props.color ? props.color : "#0263FF"} height={props.size ? props.size : 40} width={props.size ? props.size : 40} />
    </Flex>
  );
}