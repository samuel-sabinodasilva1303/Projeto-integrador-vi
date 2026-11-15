// src/components/Header.js
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu, FiPackage } from "react-icons/fi";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { onOpen } = useSidebarContext();

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      px={{ base: 4, lg: 8 }}
      align="center"
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      {isMobile && (
        <IconButton
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="ghost"
          fontSize="22"
          mr="2"
          aria-label="Abrir menu"
        />
      )}

      <HStack spacing="2" color="brand.500">
        <Icon as={FiPackage} boxSize="6" />
        <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">
          Estoque<span color="gray.400">.</span>
        </Text>
      </HStack>

      <Flex ml="auto" align="center">
        <HStack spacing="3">
          <Box textAlign="right" display={{ base: "none", md: "block" }}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              Samuel
            </Text>
            <Text fontSize="xs" color="gray.400">
              Administrador
            </Text>
          </Box>
          <Avatar size="sm" name="Samuel" bg="brand.500" color="white" />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;