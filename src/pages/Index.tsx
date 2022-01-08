import React, { useEffect } from "react";
import { RouteComponentProps, navigate } from "@reach/router";

import Fullscreen from "../componets/Fullscreen";
import Button from "../componets/Button";

export default function Index(props: RouteComponentProps) {
  return (
    <Fullscreen>
      <Button onClick={() => window.open("http://localhost:4000/auth", "_self")}>Sign in with Spotify</Button>
    </Fullscreen>
  );
}
