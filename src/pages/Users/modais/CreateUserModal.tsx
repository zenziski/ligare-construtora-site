import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useToast, ModalOverlay, useDisclosure, Select, FormControl, ButtonGroup, Button, Input } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAccessibleCompaniesResponse } from "@/_services/interface/company.interface";
import { FormButton } from "@/components/button.component";
import MiniLoading from "@/components/miniLoading"
import { DashInput } from "@/components/DashInput";
import { getCompany } from "@/_services/company.service";
import { getCookie } from "react-use-cookie";
import { registerInBulk } from "@/_services/users.service";
import { IRegistrationInputs } from "@/_services/interface/user.interface";

interface ICreateUserModalProps {
  flushHook: React.Dispatch<React.SetStateAction<boolean>>;
  allCompanies: IAccessibleCompaniesResponse[]
}

interface ICompanySelect {
  value: string;
  label: string;
}

export interface IValueLabel {
  value: number;
  label: string;
}

interface IUserCreateForm {
  company: string;
  name: string;
  email: string;
}

export const CreateUserModal = (props: ICreateUserModalProps) => {
  const YupUserChangeForm = Yup.object().shape({
    company: Yup.string().required('Empresa'),
    name: Yup.string().required('Nome'),
    email: Yup.string().required('Email')
  });

  const resolverForm = { resolver: yupResolver(YupUserChangeForm) };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [listAllCompanies, setCompanyList] = useState<ICompanySelect[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theToken = getCookie('token');

  const { formState: { errors }, setValue, register, watch, handleSubmit, reset } = useForm<IUserCreateForm>(resolverForm);
  const toast = useToast();

  useEffect(() => {
    //Here the system organize the list of companies in a way that the system can generate a select box
    const companyList: ICompanySelect[] = [];
    props.allCompanies.forEach((_x: IAccessibleCompaniesResponse) => {
      companyList.push({
        value: _x.guid_company,
        label: _x.name,
      });
    });
    setCompanyList(companyList);
  }, [props.allCompanies]);

  const sendPostCreateUser = async (data: IRegistrationInputs) => {   
    const clone = {
      'list': [data]
    }; 
    const { status, response } = await registerInBulk(clone, data.guid_company);

    if (status === 200) {
      toast({
        title: 'Usuário criada com sucesso',
        description: `O usuário ${data.name} foi criado com sucesso`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });

      //Reset the entire form
      reset({
        name: '',
        email: '',
        company: ''
      });
      //Refresh the list
      props.flushHook(true);
      //Close the modal
      onClose();
    } else {
      toast({
        title: 'Falha ao criar o usuario',
        description: `O usuario ${data.name} não foi criado, motivo: E-mail Duplicado.`,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      //Refresh the list
      props.flushHook(true);
      //Close the modal
      onClose();
    }
  };

  const handleFormInfo = async (data: IUserCreateForm) => {
    setSubmitDisabled(true);
    setIsLoading(true)
    
    const { status, response } = await getCompany(data.company, theToken);
    
    const sendData = {
      name: data.name,
      email: data.email,
      guid_company: response.guid_company
    }

    sendPostCreateUser(sendData);

    setIsLoading(false)
    setSubmitDisabled(false);
  };

  const onInvalid = (errors: any) => { console.error(errors) }


  return (
    <>
      <ButtonGroup onClick={onOpen} size="sm" mt="24px" isAttached color="white" >
        <Button leftIcon={<AddIcon />} bgColor="#4B4EFF" _hover={{ bg: '#282be0' }}>
          Criar Usuário
        </Button>
      </ButtonGroup>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => { onClose() }} size={"xl"} >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' alignItems="center" />
        <ModalContent flexGrow="1" flexShrink="1" borderRadius="8px" p="16px" borderLeft="12px solid #0263FF" >
          <ModalHeader fontFamily="Poppins-Medium">Criar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Poppins-Medium" >
            <FormControl>
              <Flex alignItems="stretch" direction="column" gap="8px" justifyContent="center">
                <Flex direction="row" gap={2} flexGrow={1}>
                  {listAllCompanies.length > 0 ? (
                    <Select variant="outline" borderRadius="0" borderBottom="1 px white" borderTop="none" placeholder="Selecione a Empresa Matriz (Opcional)" borderLeft="none" borderRight="none" fontSize="12px" {...register("company")}>
                      {listAllCompanies.map((_el, _id) => (
                        <option key={_id} value={_el.value}>{_el.label}</option>
                      ))}
                    </Select>
                  ) : null}
                </Flex>

                <DashInput placeholder="Nome" {...register("name", { required: true })} />
                <DashInput placeholder="Email" {...register("email", { required: true })} />

                <Flex alignItems="stretch" direction="column" gap={2} flexGrow={1} mt={4}>
                  <FormButton onClick={handleSubmit(handleFormInfo, onInvalid)} disabled={submitDisabled}>
                    {isLoading ? <MiniLoading size={20} /> : 'Criar Novo Usuário'}
                  </FormButton>
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}