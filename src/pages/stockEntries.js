// src/pages/stockEntries.js
import {
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FiArrowDownCircle, FiTrash2 } from "react-icons/fi";
import Layout from "../components/Layout";

const StockEntries = () => {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listStockEntries, setStockEntries] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    setStockEntries(db_stock_entries);

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewEntry = () => {
    // 🔧 correção: era `|` (bitwise OR), agora é `||` (OR lógico)
    if (!amount || Number(amount) <= 0 || product_id === "0") {
      toast({
        title: "Selecione o produto e uma quantidade válida!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const id = Math.random().toString(36).substring(2);
    const newEntry = { id, amount, product_id };

    const updated =
      listStockEntries && listStockEntries.length
        ? [...listStockEntries, newEntry]
        : [newEntry];

    localStorage.setItem("db_stock_entries", JSON.stringify(updated));
    setStockEntries(updated);

    setAmount("");
    setProduct_id("0");

    toast({
      title: "Entrada registrada",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeEntries = (id) => {
    const newArray = listStockEntries.filter((item) => item.id !== id);

    localStorage.setItem("db_stock_entries", JSON.stringify(newArray));
    setStockEntries(newArray);

    toast({
      title: "Entrada removida",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const getProductById = (id) => {
    return listProducts.filter((item) => item.id === id)[0]?.name;
  };

  const totalEntradas = useMemo(
    () => listStockEntries.reduce((acc, item) => acc + Number(item.amount), 0),
    [listStockEntries]
  );

  return (
    <Layout
      title="Entradas"
      subtitle="Registre as entradas de produtos no estoque"
    >
      <Box
        bg="white"
        p="6"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
      >
        {/* Formulário de entrada */}
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleNewEntry();
          }}
          display="flex"
          gap="3"
          mb="6"
          flexWrap="wrap"
        >
          <Select
            value={product_id}
            onChange={(e) => setProduct_id(e.target.value)}
            flex="2"
            minW="200px"
            focusBorderColor="brand.500"
          >
            <option value="0">Selecione um item</option>
            {listProducts &&
              listProducts.length > 0 &&
              listProducts.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>

          <Input
            placeholder="Quantidade"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            flex="1"
            minW="120px"
            focusBorderColor="brand.500"
          />

          <Button
            type="submit"
            leftIcon={<FiArrowDownCircle />}
            colorScheme="green"
            px="6"
          >
            SALVAR
          </Button>
        </Box>

        {/* Tabela */}
        <Box overflowY="auto" maxH="60vh">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontWeight="bold" fontSize="14px">
                  Nome
                </Th>
                <Th fontWeight="bold" fontSize="14px" isNumeric>
                  Qtd.
                </Th>
                <Th w="80px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listStockEntries.map((item, i) => (
                <Tr key={i}>
                  <Td fontWeight="medium">{getProductById(item.product_id)}</Td>
                  <Td isNumeric>
                    <Badge colorScheme="green">+{item.amount}</Badge>
                  </Td>
                  <Td textAlign="end">
                    <IconButton
                      aria-label="Excluir entrada"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeEntries(item.id)}
                    />
                  </Td>
                </Tr>
              ))}

              {listStockEntries.length === 0 && (
                <Tr>
                  <Td colSpan={3} textAlign="center" color="gray.400" py="8">
                    Nenhuma entrada registrada ainda.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        {listStockEntries.length > 0 && (
          <Box mt="4" fontSize="sm" color="gray.500" textAlign="right">
            Total de entradas:{" "}
            <Badge colorScheme="green" fontSize="sm">
              +{totalEntradas}
            </Badge>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default StockEntries;