import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { keyframes } from '@emotion/react';
import type { AppProps } from 'next/app'
import "../styles/index.css";
import 'swiper/swiper-bundle.min.css';
import '../pages/obras/swiper.css';
import { AnimatePresence } from 'framer-motion';

const underlineAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 30%;
  }
`;
const theme = extendTheme({
  colors: {
    primary: "#ecc94b",
    secondary: "#171717"
  },
  styles: {
    global: {
      ".underline-animation": {
        position: "relative",
        display: "inline-block",
        _after: {
          content: '""',
          position: "absolute",
          bottom: "-4px",
          right: 0,
          width: "0",
          height: "2px",
          backgroundColor: "primary",
          opacity: 0,
          transition: "width 0.3s, opacity 0.3s",
        },
        _hover: {
          _after: {
            width: "100%",
            opacity: 1,
          },
        },
      },
      ".underline-text": {
        position: "relative",
        display: "inline-block",
        _after: {
          content: '""',
          position: "absolute",
          bottom: "-4px",
          right: 0,
          width: "20%",
          height: "2px",
          backgroundColor: "primary",
          transition: "width 0.3s, opacity 0.3s",
        },
        _hover: {
          _after: {
            width: "100%",
          },
        },
      },
      ".underline-text-heading-right": {
        position: "relative",
        display: "inline-block",
      },
      ".underline-text-heading-right::after": {
        content: '""',
        position: "absolute",
        bottom: "25px",
        right: 0,
        width: "30%",
        height: "7px",
        backgroundColor: "primary",
        transition: "width 0.3s, opacity 0.3s",
        zIndex: -1,
        animation: `${underlineAnimation} 1.5s ease-in`,
      },
      ".underline-text-heading-left": {
        position: "relative",
        display: "inline-block",
      },
      ".underline-text-heading-left::after": {
        content: '""',
        position: "absolute",
        bottom: "25px",
        left: 0,
        width: "30%",
        height: "7px",
        backgroundColor: "primary",
        transition: "width 0.3s, opacity 0.3s",
        zIndex: -1,
        animation: `${underlineAnimation} 1.5s ease-in`,
      },
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Roboto, sans-serif',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </ChakraProvider>

  )
}
