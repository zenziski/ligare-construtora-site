'use client'
import {
  IconButton,
  Flex,
  HStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { FiMenu, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

interface AdminHeaderProps {
  onOpen: () => void;
}

export default function AdminHeader({ onOpen }: AdminHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      position="fixed"
      top={0}
      right={0}
      left={{ base: 0, md: 60 }}
      zIndex={10}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="Poppins-Bold"
        fontWeight="bold"
        color="blue.600"
      >
        Ligare
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
        />
        
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar size={'sm'} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
