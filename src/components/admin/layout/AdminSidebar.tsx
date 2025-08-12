'use client'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  VStack,
  Avatar,
  Divider,
  FlexProps,
} from '@chakra-ui/react';
import { FiHome, FiImage, FiUsers, FiMail } from 'react-icons/fi';
import { MdConstruction } from 'react-icons/md';
import { IconType } from 'react-icons';
import { ReactNode } from 'react';

const LinkItems: Array<{name: string, icon: IconType}> = [
  { name: 'Galeria', icon: FiImage },
  { name: 'Home', icon: FiHome },
  { name: 'Obras', icon: MdConstruction },
  { name: 'Sobre nós', icon: FiUsers },
  { name: 'Contatos', icon: FiMail },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
  currentStep: string;
  onStepChange: (step: string) => void;
}

export default function AdminSidebar({ onClose, currentStep, onStepChange, ...rest }: SidebarProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <Box
      transition="3s ease"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="Poppins-Bold" fontWeight="bold" color="blue.600">
          Ligare Admin
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <VStack spacing={1} align="stretch" px={4}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            isActive={currentStep === link.name}
            onClick={() => {
              onStepChange(link.name);
              onClose();
            }}
          >
            {link.name}
          </NavItem>
        ))}
      </VStack>

      <Box position="absolute" bottom={4} left={4} right={4}>
        <Divider mb={4} />
        <Flex align="center">
          <Avatar size="sm" />
          <Box ml={3}>
            <Text fontSize="sm" fontWeight="medium">Admin User</Text>
            <Text fontSize="xs" color="gray.500">admin@ligare.com</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, children, isActive, onClick, ...rest }: NavItemProps) => {
  const bgColor = useColorModeValue(
    isActive ? 'blue.50' : 'transparent',
    isActive ? 'blue.900' : 'transparent'
  );
  const color = useColorModeValue(
    isActive ? 'blue.600' : 'gray.600',
    isActive ? 'blue.200' : 'gray.400'
  );

  return (
    <Flex
      align="center"
      p="3"
      mx="2"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bg={bgColor}
      color={color}
      fontWeight={isActive ? 'semibold' : 'normal'}
      _hover={{
        bg: useColorModeValue('blue.50', 'blue.900'),
        color: useColorModeValue('blue.600', 'blue.200'),
      }}
      onClick={onClick}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};
