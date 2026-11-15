// src/pages/stockOutputs.js
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
import { FiArrowUpCircle, FiTrash2 } from "react-icons/fi";
import Layout from "../components/Layout";

const StockOutputs = () => {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listStockOutputs, setStockOutputs] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    setStockOutputs(db_stock_outputs);

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  // 🔎 Calcula o saldo atual de um produto (entradas - saídas)
  const getBalance = (id) => {
    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const entries = db_stock_entries
      .filter((item) => item.product_id === id)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

    const outputs = listStockOutputs
      .filter((item) => item.product_id === id)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

    return entries - outputs;
  };

  const handleNewOutput = () => {
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

    // 🚨 valida se há saldo suficiente antes de dar saída
    const saldo = getBalance(product_id);
    if (Number(amount) > saldo) {
      toast({
        title: "Saldo insuficiente!",
        description: `Disponível: ${saldo}. Solicitado: ${amount}.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const id = Math.random().toString(36).substring(2);
    const newOutput = { id, amount, product_id };

    const updated =
      listStockOutputs && listStockOutputs.length
        ? [...listStockOutputs, newOutput]
        : [newOutput];

    localStorage.setItem("db_stock_outputs", JSON.stringify(updated));
    setStockOutputs(updated);

    setAmount("");
    setProduct_id("0");

    toast({
      title: "Saída registrada",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeOutput = (id) => {
    const newArray = listStockOutputs.filter((item) => item.id !== id);

    localStorage.setItem("db_stock_outputs", JSON.stringify(newArray));
    setStockOutputs(newArray);

    toast({
      title: "Saída removida",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const getProductById = (id) => {
    return listProducts.filter((item) => item.id === id)[0]?.name;
  };

  const totalSaidas = useMemo(
    () => listStockOutputs.reduce((acc, item) => acc + Number(item.amount), 0),
    [listStockOutputs]
  );

  return (
    <Layout
      title="Saídas"
      subtitle="Registre as saídas de produtos do estoque"
    >
      <Box
        bg="white"
        p="6"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
      >
        {/* Formulário de saída */}
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleNewOutput();
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
            leftIcon={<FiArrowUpCircle />}
            colorScheme="red"
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
              {listStockOutputs.map((item, i) => (
                <Tr key={i}>
                  <Td fontWeight="medium">{getProductById(item.product_id)}</Td>
                  <Td isNumeric>
                    <Badge colorScheme="red">-{item.amount}</Badge>
                  </Td>
                  <Td textAlign="end">
                    <IconButton
                      aria-label="Excluir saída"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeOutput(item.id)}
                    />
                  </Td>
                </Tr>
              ))}

              {listStockOutputs.length === 0 && (
                <Tr>
                  <Td colSpan={3} textAlign="center" color="gray.400" py="8">
                    Nenhuma saída registrada ainda.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        {listStockOutputs.length > 0 && (
          <Box mt="4" fontSize="sm" color="gray.500" textAlign="right">
            Total de saídas:{" "}
            <Badge colorScheme="red" fontSize="sm">
              -{totalSaidas}
            </Badge>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default StockOutputs;