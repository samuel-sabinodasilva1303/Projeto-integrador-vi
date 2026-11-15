// src/components/Sidebar.js
import {
  Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
  DrawerHeader, DrawerOverlay, useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import SidebarNav from "./SidebarNav";

const Sidebar = () => {
  const { isOpen, onClose } = useSidebarContext();
  const isDrawerSidebar = useBreakpointValue({ base: true, lg: false });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize="lg">
            Menu
          </DrawerHeader>
          <DrawerBody pt="4">
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      as="aside"
      w="64"
      mr="8"
      py="6"
      px="2"
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      h="fit-content"
      position="sticky"
      top="24"
    >
      <SidebarNav />
    </Box>
  );
};

export default Sidebar;