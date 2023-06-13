import { Flex, Table, Text, TableContainer, Tbody, Td, Th, Thead, Tr, Image, Badge, useToast, InputGroup, Tooltip } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react";
import { InputFilter, SelectFilter } from "../../components/SelectFilter";
import LoadingComponent from "../../components/loading";
import { CreateUserModal } from "@/pages/Users/modais/CreateUserModal";
import { IAccessibleCompaniesResponse } from "@/_services/interface/company.interface";
import { getCompanyList } from "@/_services/company.service";
import { getCookie } from "react-use-cookie";
import { getAll } from "../../_services/users.service";
import { IUserInfo } from "@/_services/interface/user.interface";

interface IUserTagProps {
  text: string;
  color: string;
}

export const UserTag = (props: IUserTagProps) => {
  return <Badge p="3px 15px" borderRadius={5} bg={props.color} fontSize={10}>{props.text}</Badge>;
}

export default function UsersPanel() {
    const [data, setData] = useState<IUserInfo[]>();
    const [filteredData, setFilteredData] = useState<IUserInfo[]>([])
    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [allCompanies, setAllCompanies] = useState<IAccessibleCompaniesResponse[]>([]);
    const [showDisabled, setShowDisabled] = useState<boolean>(false)
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const toast = useToast();
    const theToken = getCookie('token');

    const getCompanyData = async () => {
      setLoadingState(true);
      const { status, response } = await getCompanyList(theToken);
      if (status === 200) {
        //All companies reference
        setAllCompanies(response as IAccessibleCompaniesResponse[]);
        //filteringCompanies((response as IAccessibleCompaniesResponse[])[0].guid_company);
      } else {
        toast({
          title: 'Ocorreu um erro',
          description: 'Ocorreu um erro ao tentar puxar as informações dos usuários',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
  
      setLoadingState(false);
    }

    useEffect(() => {
      if (data) {
        const copy = [...data]
        if (!showDisabled) {
          setFilteredData(copy.filter(item => !item.isBlocked))
        } else {
          setFilteredData(copy)
        }
      }

    }, [showDisabled, data])

    useEffect(() => {
      //Refresh the company
        getCompanyData();
    }, [refreshData]);

    const fetchData = async () => {
      setLoadingState(true);
      const { status, response } = await getAll(theToken);
      if (status === 200) {
        setData(response as IUserInfo[]);
      } else {
        toast({
          title: 'Ocorreu um erro',
          description: 'Ocorreu um erro ao tentar puxar as informações dos usuários',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
      setLoadingState(false);
    }

    useEffect(() => {
      fetchData();
    }, []);

    const checkUserStatus = (data: IUserInfo) => {
      if (data.isValidated) {
        if (data.isBlocked) {
          return <UserTag text="Inativo" color="#FFD2D2" />
        } else {
          return <UserTag text="Validado" color="#CCECC9" />
        }
      } else {
        if (data.isBlocked) {
          return <UserTag text="Inativo" color="#FFD2D2" />
        } else {
          return <UserTag text="Aguardando" color="#FFE1B5" />
        }
      }
    }

    const checkNameStatus = (data: IUserInfo) => {
      if (!data.isValidated) {
        if (!data.isBlocked) {
          return (
            <Flex alignItems="center" gap="8px" >
              {data.name ? data.name : data.email.split('@')[0]}
              <Tooltip label="Este usuário ainda não concluiu seu cadastro" placement="top">
                <Image src={`../icons/alert.svg`} />
              </Tooltip>
            </Flex>
          );
        } else {
          return (
            <Flex alignItems="center" gap="8px" >
              {data.name ? data.name : data.email.split('@')[0]}
              <Tooltip label="Este usuário está inativo" placement="top">
                <Image src={`../icons/minus-red.svg`} />
              </Tooltip>
            </Flex>
          );
        }
      } else {
        return data.name;
      }
    }

    return (
        <Flex bg="gray.100" width="100%" direction="column" p={10} pt={4}>
          <Flex flexDirection="row" justifyContent="space-between" borderBottom="1px" borderBottomColor="gray.300" pb={4}>
            <Text fontSize="20px" mt={8} fontFamily="Poppins-Medium">Listagem Geral de Usuarios {!isLoading && data ? ` (${data.length})` : null}</Text>
            {!isLoading ? (
              <Flex alignItems='center' gap={4}>
                <CreateUserModal flushHook={setRefreshData} allCompanies={allCompanies}/>
              </Flex>
            ) : null}
          </Flex>
    
          <Flex align="start" mt={8} _hover={{ cursor: "pointer" }} gap={4} onClick={() => setShowDisabled(!showDisabled)} maxW="300px">
            {showDisabled ? (
              <Image w="50px" src="/icons/switch-blue.svg" />
            ) : (
              <Image w="50px" src="/icons/switch-gray.svg" />
            )}
            <Flex direction="column">
              <Text fontSize="14px">
                Mostrar usuários inativos
              </Text>
            </Flex>
          </Flex>
    
          <Flex mt={12} direction="column">
            {!isLoading && 1 > 0 ? (
              <>
                <TableContainer fontFamily="Poppins-Medium" flexGrow="1" flexShrink="1" backgroundColor="white" mt={10}>
                  <Table variant='striped' colorScheme='gray' fontSize="12px" borderRadius={5}>
                    <Thead>
                      <Tr>
                        <Th textTransform="none" fontFamily="Poppins-Medium">Nome</Th>
                        <Th textTransform="none" fontFamily="Poppins-Medium" textAlign="center" width={100}>Email</Th>
                        <Th textTransform="none" fontFamily="Poppins-Medium" textAlign="center" width={100}>Telefone</Th>
                        <Th textTransform="none" fontFamily="Poppins-Medium" textAlign="center" width={150}>Status</Th>
                        {/* <Th textTransform="none" fontFamily="Poppins-Medium" textAlign="center" width={200}>Histórico</Th> */}
                        <Th textTransform="none" fontFamily="Poppins-Medium" width={100}></Th>
                      </Tr>
                    </Thead>
                    <Tbody alignItems="center" justifyContent="center">
                      {filteredData.map((info: IUserInfo, index) =>
                        <Tr key={index}>
                          <Td>{checkNameStatus(info)}</Td>
                          <Td>{info.email}</Td>
                          <Td>{info.phoneNumber}</Td>
                          <Td>{checkUserStatus(info)}</Td>
                          <Td></Td>
                        </Tr>
                      )}
                      
                    </Tbody>
                  </Table>
                </TableContainer>
                {/* <Pagination pageCallback={setCurrentPage} totalPages={totalPages} /> */}
              </>
            ) : (
              <LoadingComponent />
            )}
          </Flex>
        </Flex>
      )
}
