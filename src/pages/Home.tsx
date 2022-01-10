import React, { useState } from "react";
import { RouteComponentProps, Router } from "@reach/router";

import Dashboard from "./Dashboard";
import Header from "../componets/Header";
import PlayerControls from "../componets/PlayerControls";
import ArtistRadio from "./ArtistRadio";
import { Artist } from "../utils/models";

export default function Home(props: RouteComponentProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined);
  return (
    <div className="bg-gray-300" style={{ paddingBottom: 200 }}>
      <Header />
      <Router>
        <Dashboard path="/" onOpenRadio={setSelectedArtist} />
        <ArtistRadio path="/artist-radio" artist={selectedArtist} />
      </Router>
      <PlayerControls />
    </div>
  );
}
