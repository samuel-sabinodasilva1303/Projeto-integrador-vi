// src/components/Layout.js
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, title, subtitle, actions }) => (
  <Flex h="100vh" flexDirection="column">
    <Header />
    <Flex w="100%" maxW={1200} mx="auto" px={{ base: 4, lg: 8 }} py="6" gap="6">
      <Sidebar />
      <Box w="100%" minW="0">
        {(title || actions) && (
          <Flex justify="space-between" align="center" mb="6" wrap="wrap" gap="3">
            <Box>
              {title && (
                <Box as="h1" fontSize="2xl" fontWeight="bold" color="gray.800">
                  {title}
                </Box>
              )}
              {subtitle && (
                <Box fontSize="sm" color="gray.500" mt="1">
                  {subtitle}
                </Box>
              )}
            </Box>
            {actions}
          </Flex>
        )}
        {children}
      </Box>
    </Flex>
  </Flex>
);

export default Layout;