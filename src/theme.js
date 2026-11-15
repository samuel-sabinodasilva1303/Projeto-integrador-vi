// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#E6F6FF",
      100: "#BAE3FF",
      200: "#7CC4FA",
      300: "#47A3F3",
      400: "#2186EB",
      500: "#0967D2", // sua cor principal
      600: "#0552B5",
      700: "#03449E",
      800: "#01337D",
      900: "#002159",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: { bg: "gray.50", color: "gray.700" },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: "brand" },
      baseStyle: { fontWeight: "semibold", borderRadius: "md" },
    },
    Table: {
      baseStyle: {
        th: { borderColor: "gray.200" },
        td: { borderColor: "gray.100" },
      },
    },
  },
});

export default theme;