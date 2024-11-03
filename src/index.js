import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0ProviderWithNavigate } from "./auth0-provider";
const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
