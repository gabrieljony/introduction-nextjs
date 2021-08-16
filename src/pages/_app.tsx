import { ChakraProvider } from "@chakra-ui/react"
import GlobalStyle from "@/styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <GlobalStyle />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
