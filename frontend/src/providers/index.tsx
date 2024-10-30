import { ThemeProvider } from "@/context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

interface ProviderProps {
  children: React.ReactNode;
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          <HelmetProvider>{children}</HelmetProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
