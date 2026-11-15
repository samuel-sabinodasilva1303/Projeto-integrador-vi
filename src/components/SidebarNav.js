// src/components/SidebarNav.js
import React from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiBox,
  FiBarChart2,
  FiArrowDownCircle,
  FiArrowUpCircle,
} from "react-icons/fi";

const NavItem = ({ href, icon, label, isActive }) => (
  <ChakraLink as={Link} href={href} _hover={{ textDecoration: "none" }}>
    <Flex
      align="center"
      gap="3"
      px="3"
      py="2"
      borderRadius="md"
      fontSize="sm"
      fontWeight="medium"
      color={isActive ? "blue.600" : "gray.600"}
      bg={isActive ? "blue.50" : "transparent"}
      _hover={{ bg: isActive ? "blue.50" : "gray.100" }}
      transition="background 0.15s"
    >
      <Icon as={icon} boxSize="4" />
      {label}
    </Flex>
  </ChakraLink>
);

const SidebarNav = () => {
  const { asPath } = useRouter();

  return (
    <Stack spacing="6">
      <Box>
        <Text fontSize="xs" fontWeight="bold" color="gray.400" px="3" mb="2">
          CADASTRO
        </Text>
        <Stack spacing="1">
          <NavItem
            href="/"
            icon={FiBox}
            label="Produtos"
            isActive={asPath === "/"}
          />
        </Stack>
      </Box>

      <Box>
        <Text fontSize="xs" fontWeight="bold" color="gray.400" px="3" mb="2">
          ESTOQUE
        </Text>
        <Stack spacing="1">
          <NavItem
            href="/balance"
            icon={FiBarChart2}
            label="Saldo"
            isActive={asPath === "/balance"}
          />
          <NavItem
            href="/stockEntries"
            icon={FiArrowDownCircle}
            label="Entradas"
            isActive={asPath === "/stockEntries"}
          />
          <NavItem
            href="/stockOutputs"
            icon={FiArrowUpCircle}
            label="Saídas"
            isActive={asPath === "/stockOutputs"}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default SidebarNav;