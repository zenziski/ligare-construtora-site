import { useDisclosure, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { useValidation } from "../../../../_hooks/useValidate";
import { ICollaborators } from "../../../../_services/interface/company.interface";
import { IHistory } from "../../../../_services/interface/user.interface";
import { getHistory } from "../../../../_services/user.service";
import { organizeText } from "../utils/user.functions";

interface IHistoryModal {
  guid_company: string;
  user: ICollaborators;
}

export const HistoryModal = (props: IHistoryModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allHistory, setAllHistory] = useState<IHistory[]>([]);
  const toast = useToast();
  const sysValidation = useValidation();

  //Pagination
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedFilter, setPaginatedFilter] = useState<IHistory[]>([]);
  const itemsPerPage = 5;

  const checkHistory = async () => {
    await sysValidation(async (token: string) => {
      const { status, response } = await getHistory(props.guid_company, props.user.guid_user, token);
      if (status === 200) {
        const resp:IHistory[] = response as IHistory[];
        setTotalPages(Math.ceil(resp.length / itemsPerPage));
        setAllHistory(response as IHistory[]);
      } else {
        toast({
          title: "Não foi possível retornar o Histórico deste usuário.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    //Define the pointers
    const ptr1 = (currentPage - 1) * itemsPerPage;
    const ptr2 = ptr1 + itemsPerPage;
    setPaginatedFilter(allHistory.slice(ptr1, ptr2));
    //setPaginatedFilter(currentFilter);
  }, [allHistory, currentPage]);
  
  useEffect(() => {
    if (isOpen) {
      checkHistory();
    }
  }, [isOpen]);

  return (
    <>
      <Flex alignItems="center" justifyContent="center" onClick={onOpen} _hover={{ cursor: "pointer" }}>
        <Image src="../icons/history.svg" />
      </Flex>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' alignItems="center" />
        <ModalContent flexGrow={1} flexShrink={1} borderLeft="12px solid #0263FF" borderRadius={8}>
          <ModalHeader fontFamily="Poppins-SemiBold">Histórico de Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="Poppins-medium" fontSize={12}>
            <Flex justifyContent="center" flexDirection="column">
              <TableContainer height={420}>
                <Table variant='striped' colorScheme='gray' fontSize="12px" fontFamily="Poppins-Medium">
                  <Thead>
                    <Tr>
                      <Th textTransform="none" fontFamily="Poppins-Medium">Atividade</Th>
                      <Th textAlign="center" width={100} textTransform="none" fontFamily="Poppins-Medium">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody alignItems="center" justifyContent="center">
                    {paginatedFilter.map((_el, _index) => (
                      <Tr key={_index}>
                        <Td>{organizeText(_el)}</Td>
                        <Td textAlign="center">{moment(_el.createdAt).fromNow()}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <Pagination pageCallback={setCurrentPage} totalPages={totalPages} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}