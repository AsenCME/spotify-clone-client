import React from "react";
import { Router } from "@reach/router";
import { QueryClientProvider } from "react-query";

// utils
import queryClient from "./utils/queryClient";

// pages
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Home from "./pages/Home";
import PlayerProvider from "./utils/Player";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <Router>
          <Index path="/" />
          <Auth path="/auth/*" />
          <Home path="/home/*" />
        </Router>
      </PlayerProvider>
    </QueryClientProvider>
  );
}

export default App;
