'use client'
import { Box, Flex, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  currentStep: string;
  onStepChange: (step: string) => void;
}

export default function AdminLayout({ children, currentStep, onStepChange }: AdminLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <AdminSidebar
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
        currentStep={currentStep}
        onStepChange={onStepChange}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <AdminSidebar 
            onClose={onClose} 
            currentStep={currentStep}
            onStepChange={onStepChange}
          />
        </DrawerContent>
      </Drawer>
      
      {/* <AdminHeader onOpen={onOpen} /> */}
      
      <Box ml={{ base: 0, md: 60 }} p="4" pt="20">
        {children}
      </Box>
    </Box>
  );
}
