import { Input, Select } from "@chakra-ui/react"

interface IFilterProps {
  value: any;
  placeholder: string;
  onChange: any;
  children?: any;
  disabled?: boolean;
}

export const SelectFilter = (props: IFilterProps) => {
  return (
    <Select
      display="flex"
      borderRadius="0"
      borderTop="none"
      borderLeft="none"
      borderRight="none"
      fontFamily="Poppins-Medium"
      borderBottom="1px solid"
      borderBottomColor="blackAlpha.300"
      placeholder={props.placeholder}
      _hover={{ cursor: "pointer" }}
      color="blue"
      textColor="#A1A1A1"
      fontSize="12px"
      value={props.value}
      onChange={props.onChange}
      isDisabled={props.disabled ? props.disabled : false}
    >
      {props.children}
    </Select>
  );
}

export const InputFilter = (props: IFilterProps) => {
  return (
    <Input
      display="flex"
      fontSize="12px"
      bg="#F3F3F3"
      fontFamily="Poppins-Medium"
      borderRadius="0px"
      borderTop="none"
      borderX="none"
      bgColor="transparent"
      borderBottom="1px solid"
      borderBottomColor="blackAlpha.300"
      type="search"
      placeholder={props.placeholder}
      color="#A1A1A1"
      value={props.value}
      onChange={props.onChange}
    />
  );
}