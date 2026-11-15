// src/pages/index.js
import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Produtos = () => {
  const [name, setName] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewProduct = () => {
    if (!name.trim()) return;

    if (verifyProductName()) {
      toast({
        title: "Produto já cadastrado!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const id = Math.random().toString(36).substring(2);
    const newProduct = { id, name: name.trim() };

    const updated =
      listProducts && listProducts.length
        ? [...listProducts, newProduct]
        : [newProduct];

    localStorage.setItem("db_products", JSON.stringify(updated));
    setListProducts(updated);
    setName("");

    toast({
      title: "Produto cadastrado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const verifyProductName = () => {
    return !!listProducts.find(
      (prod) => prod.name.toLowerCase() === name.trim().toLowerCase()
    );
  };

  const removeProduct = (id) => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const hasOutputs = db_stock_outputs.filter(
      (item) => item.product_id === id
    ).length;
    const hasEntries = db_stock_entries.filter(
      (item) => item.product_id === id
    ).length;

    if (hasEntries || hasOutputs) {
      toast({
        title: "Esse produto possui movimentações!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newArray = listProducts.filter((prod) => prod.id !== id);

    localStorage.setItem("db_products", JSON.stringify(newArray));
    setListProducts(newArray);

    toast({
      title: "Produto removido",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex
        w="100%"
        maxW={1200}
        mx="auto"
        px={{ base: 4, lg: 8 }}
        py="6"
        gap="6"
      >
        <Sidebar />

        <Box w="100%" minW="0">
          <Box mb="6">
            <Box as="h1" fontSize="2xl" fontWeight="bold" color="gray.800">
              Produtos
            </Box>
            <Box fontSize="sm" color="gray.500" mt="1">
              Cadastre e gerencie os produtos do estoque
            </Box>
          </Box>

          <Box
            bg="white"
            p="6"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Box
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleNewProduct();
              }}
              display="flex"
              gap="3"
              mb="6"
              flexWrap="wrap"
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do produto"
                flex="1"
                minW="240px"
                focusBorderColor="blue.500"
              />
              <Button
                type="submit"
                leftIcon={<FiPlus />}
                colorScheme="blue"
                px="6"
              >
                CADASTRAR
              </Button>
            </Box>

            <Box overflowY="auto" maxH="60vh">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontWeight="bold" fontSize="14px">
                      Nome
                    </Th>
                    <Th w="80px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listProducts.map((item, i) => (
                    <Tr key={i}>
                      <Td fontWeight="medium">{item.name}</Td>
                      <Td textAlign="end">
                        <IconButton
                          aria-label="Excluir produto"
                          icon={<FiTrash2 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeProduct(item.id)}
                        />
                      </Td>
                    </Tr>
                  ))}

                  {listProducts.length === 0 && (
                    <Tr>
                      <Td colSpan={2} textAlign="center" color="gray.400" py="8">
                        Nenhum produto cadastrado ainda.
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>

            {listProducts.length > 0 && (
              <Box mt="4" fontSize="sm" color="gray.500">
                <Badge colorScheme="blue">{listProducts.length}</Badge>{" "}
                produto(s) cadastrado(s)
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Produtos;