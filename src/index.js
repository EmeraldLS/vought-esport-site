import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(

  <BrowserRouter>
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
  
);

