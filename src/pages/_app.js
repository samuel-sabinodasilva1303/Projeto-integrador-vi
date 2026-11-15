import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { SidebarProvider } from "../contexts/SidebarContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;