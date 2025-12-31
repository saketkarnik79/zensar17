import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools} from '@tanstack/react-query-devtools';

//Configure query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, 
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 2
    },
    mutations: {
      retry: 0
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client = {queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);