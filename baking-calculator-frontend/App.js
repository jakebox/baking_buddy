import Navigation from "./components/Navigation";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./components/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
