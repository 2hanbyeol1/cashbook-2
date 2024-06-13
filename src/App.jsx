import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import router from "./router/router";

function App() {
  const expenses = useSelector((state) => state.expenses);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
