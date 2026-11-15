// src/pages/balance.js
import {
  Badge,
  Box,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";

const Balance = () => {
  const [listProducts, setListProducts] = useState([]);
  const [productFiltered, setProductFiltered] = useState("");
  const [cmbProducts, setCmbProducts] = useState([]);

  const BuildBalanceArray = () => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    const newArray = [];

    db_products.forEach((prod) => {
      const entries = db_stock_entries
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const outputs = db_stock_outputs
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const total = Number(entries) - Number(outputs);

      newArray.push({
        product_id: prod.id,
        product_name: prod.name,
        amount: total,
      });
    });

    // 👇 setState FORA do loop (antes era chamado N vezes dentro do .map)
    setListProducts(newArray);
    setCmbProducts(newArray);
  };

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  // 👇 Filtro agora é automático ao trocar o Select — sem botão "FILTRAR"
  const handleFilterChange = (value) => {
    setProductFiltered(value);
    if (!value) {
      setListProducts(cmbProducts);
      return;
    }
    setListProducts(cmbProducts.filter((item) => item.product_id === value));
  };

  const totalGeral = useMemo(
    () => listProducts.reduce((acc, item) => acc + Number(item.amount), 0),
    [listProducts]
  );

  return (
    <Layout
      title="Saldo"
      subtitle="Quantidade atual de cada produto em estoque"
    >
      <Box
        bg="white"
        p="6"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Select
          value={productFiltered}
          onChange={(e) => handleFilterChange(e.target.value)}
          mb="4"
          maxW="sm"
          placeholder="Selecione um item"
        >
          {cmbProducts &&
            cmbProducts.length > 0 &&
            cmbProducts.map((item, i) => (
              <option key={i} value={item.product_id}>
                {item.product_name}
              </option>
            ))}
        </Select>

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
              </Tr>
            </Thead>
            <Tbody>
              {listProducts.map((item, i) => (
                <Tr key={i}>
                  <Td fontWeight="medium">{item.product_name}</Td>
                  <Td isNumeric>
                    <Badge
                      colorScheme={
                        item.amount > 0
                          ? "green"
                          : item.amount < 0
                          ? "red"
                          : "gray"
                      }
                    >
                      {item.amount}
                    </Badge>
                  </Td>
                </Tr>
              ))}

              {listProducts.length === 0 && (
                <Tr>
                  <Td colSpan={2} textAlign="center" color="gray.400" py="8">
                    Nenhum produto encontrado.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        {listProducts.length > 0 && (
          <Box mt="4" textAlign="right" fontSize="sm" color="gray.500">
            Total em estoque:{" "}
            <Badge colorScheme="brand" fontSize="sm">
              {totalGeral}
            </Badge>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Balance;