import React, { useContext, useEffect, useMemo, useState } from "react";
import { WebPlaybackState, WebPlaybackTrack } from "./models";
import { useMutationFn } from "./queryClient";
import { getHeaders } from "./tokens";

interface Context {
  player?: any;
  currentTrack?: WebPlaybackTrack;
  play: (uri: string) => Promise<void>;
}
export const PlayerContext = React.createContext<Context>({
  play: () => Promise.resolve(),
});

interface Props {
  children: React.ReactNode;
}
export default function PlayerProvider({ children }: Props) {
  const [deviceId, setDeviceId] = useState("");
  const [playbackState, setPlaybackState] = useState<WebPlaybackState | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const currentTrack = useMemo(() => playbackState?.track_window.current_track, [playbackState]);
  const { mutateAsync } = useMutationFn();

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = getHeaders()["access-token"];
      // @ts-ignore
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb: any) => cb(token),
        volume: 0.5,
      });

      // Ready
      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      // State change
      player.addListener("player_state_changed", (state: WebPlaybackState) => {
        console.log("State changed", state);
        setPlaybackState(state);
      });

      // connect it
      player.connect();
      setPlayer(player);
    };
  }, []);

  const play = async (uri: string) => {
    await mutateAsync(["/play", { uri, deviceId }, "POST"]);
  };

  return <PlayerContext.Provider value={{ player, currentTrack, play }}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
