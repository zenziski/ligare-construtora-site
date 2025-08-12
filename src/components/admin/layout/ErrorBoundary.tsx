'use client'
import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8}>
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Algo deu errado!</AlertTitle>
              <AlertDescription>
                Ocorreu um erro inesperado. Tente recarregar a página.
              </AlertDescription>
              <Button 
                mt={4} 
                colorScheme="red" 
                onClick={() => window.location.reload()}
              >
                Recarregar Página
              </Button>
            </Box>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
