import React, { useEffect } from "react";
import { parse } from "query-string";
import { Router, RouteComponentProps, useLocation, navigate } from "@reach/router";

// componetns
import Fullscreen from "../componets/Fullscreen";
import RenderUser from "../componets/RenderUser";

// utils
import { saveTokens } from "../utils/tokens";
import Button from "../componets/Button";
import useMe from "../utils/hooks/useMe";

// Success screen
function Success(props: RouteComponentProps) {
  const location = useLocation();
  const { me, isLoading, getMe } = useMe(false);

  useEffect(() => {
    const params = parse(location.search);
    saveTokens(params["access-token"] as string, params["refresh-token"] as string, params["expires-at"] as string);
    getMe();
  }, [location, getMe]);

  return (
    <Fullscreen>
      <div className="text-2xl font-bold">Success!</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !me ? null : (
        <div className="flex flex-col mt-4">
          <RenderUser me={me} />
          <div className="h-4" />
          <Button onClick={() => navigate("/home")}>
            <div className="font-bold">Take me to the home page!</div>
          </Button>
        </div>
      )}
    </Fullscreen>
  );
}

// Fail screen
function Failure(props: RouteComponentProps) {
  return <div>Failed.</div>;
}

export default function Auth(props: RouteComponentProps) {
  return (
    <Router>
      <Success path="success" />
      <Failure path="fail" />
    </Router>
  );
}
