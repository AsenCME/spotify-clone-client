import React from "react";
import { RouteComponentProps, Router } from "@reach/router";
import Dashboard from "./Dashboard";
import Header from "../componets/Header";
import PlayerControls from "../componets/PlayerControls";

export default function Home(props: RouteComponentProps) {
  return (
    <div className="bg-gray-300" style={{ paddingBottom: 100 }}>
      <Header />
      <Router>
        <Dashboard path="/" />
      </Router>
      <PlayerControls />
    </div>
  );
}
