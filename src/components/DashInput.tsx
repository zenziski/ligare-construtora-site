import { Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import InputMask from "react-input-mask";

interface AppInputProps {
  errors?: { message?: string };
  label?: string;
  mask?: string;
}

export const DashInput = forwardRef(({ errors, label, ...otherProps }: AppInputProps & InputProps, ref) => {
  return (
    <Input
      ref={ref as React.Ref<HTMLInputElement>}
      fontSize="12px"
      bg="#F3F3F3"
      fontFamily="Poppins-medium"
      borderRadius="0px"
      borderTop="none"
      borderX="none"
      bgColor="transparent"
      borderBottom="1px solid #A1A1A1"
      borderColor="#C3BFBF"
      type="text"
      color="#3a3a3a"
      _placeholder={{ opacity: 0.7 }}
      {...otherProps}
    />
  );
});

export const DashNumber = forwardRef(({ errors, label, ...otherProps }: AppInputProps & InputProps, ref) => {
  return (
    <Input
      ref={ref as React.Ref<HTMLInputElement>}
      fontSize="12px"
      bg="#F3F3F3"
      fontFamily="Poppins-medium"
      borderRadius="0px"
      borderTop="none"
      borderX="none"
      bgColor="transparent"
      borderBottom="1px solid #A1A1A1"
      borderColor="#C3BFBF"
      type="number"
      color="#3a3a3a"
      _placeholder={{ opacity: 0.7 }}
      {...otherProps}
    />
  );
});

export const DashInputMask = forwardRef(({ errors, label, ...otherProps }: AppInputProps & InputProps, ref) => {
  return (
    <Input
      ref={ref as React.Ref<HTMLInputElement>}
      fontSize="12px"
      as={InputMask}
      bg="#F3F3F3"
      fontFamily="Poppins-medium"
      borderRadius="0px"
      borderTop="none"
      borderX="none"
      bgColor="transparent"
      borderBottom="1px solid #A1A1A1"
      borderColor="#C3BFBF"
      type="text"
      color="#3a3a3a"
      _placeholder={{ opacity: 0.7 }}
      {...otherProps}
    />
  );
});

export const DashInputDate = forwardRef(({ errors, label, ...otherProps }: AppInputProps & InputProps, ref) => {
  return (
    <Input
      ref={ref as React.Ref<HTMLInputElement>}
      //as={DatePicker}
      fontSize="12px"
      bg="#F3F3F3"
      fontFamily="Poppins-medium"
      borderRadius="0px"
      borderTop="none"
      borderX="none"
      bgColor="transparent"
      borderBottom="1px solid #A1A1A1"
      borderColor="#C3BFBF"
      type="date"
      lang="pt-BR"
      color="#3a3a3a"
      _placeholder={{ opacity: 0.7 }}
      {...otherProps}
    />
  );
});