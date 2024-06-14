import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import router from "./router/router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
