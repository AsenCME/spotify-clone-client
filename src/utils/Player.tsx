import React, { useContext, useEffect, useMemo, useState } from "react";
import { WebPlaybackState, WebPlaybackTrack } from "./models";
import { useMutationFn } from "./queryClient";
import { getHeaders } from "./tokens";

interface Context {
  player?: any;
  playing?: boolean;
  shuffle?: boolean;
  context?: string;
  currentTrack?: WebPlaybackTrack;
  play: (uri: string, context?: string) => Promise<void>;
  toggle: () => Promise<void>;
  prev: () => Promise<void>;
  next: () => Promise<void>;
  seek: (pos: number) => Promise<void>;
  setVol: (vol: number) => Promise<void>;
  getVol: () => Promise<number>;
  getState: () => Promise<WebPlaybackState | null>;
}
export const PlayerContext = React.createContext<Context>({
  play: () => Promise.resolve(),
  toggle: () => Promise.resolve(),
  prev: () => Promise.resolve(),
  next: () => Promise.resolve(),
  seek: (pos: number) => Promise.resolve(),
  setVol: (vol: number) => Promise.resolve(),
  getVol: () => Promise.resolve(0),
  getState: () => Promise.resolve(null),
});

interface Props {
  children: React.ReactNode;
}
export default function PlayerProvider({ children }: Props) {
  const [deviceId, setDeviceId] = useState("");
  const [playbackState, setPlaybackState] = useState<WebPlaybackState | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const currentTrack = useMemo(() => playbackState?.track_window.current_track, [playbackState]);
  const shuffle = useMemo(() => playbackState?.shuffle, [playbackState]);
  const playing = useMemo(() => !playbackState?.paused, [playbackState]);
  const context = useMemo(() => playbackState?.context.uri, [playbackState]);

  const { mutateAsync } = useMutationFn();

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = getHeaders()["access-token"];
      // @ts-ignore
      const player = new Spotify.Player({
        name: "Cool App",
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
        setPlaybackState(state);
      });

      // connect it
      player.connect();
      setPlayer(player);
    };

    return () => {
      player?.disconnect();
    };
  }, []);

  // shortcuts
  const play = async (uri: string, context?: string) => await mutateAsync(["/play", { uri, deviceId, context }, "POST"]);
  const toggle = async () => await player?.togglePlay();
  const next = async () => await player?.nextTrack();
  const prev = async () => await player?.previousTrack();
  const seek = async (pos: number) => await player?.seek(pos);
  const setVol = async (vol: number) => await player?.setVolume(vol);
  const getVol = async () => (player ? await player.getVolme() : 0) as number;
  const getState = async () => (player ? await player.getCurrentState() : null) as WebPlaybackState | null;

  return (
    <PlayerContext.Provider
      value={{
        shuffle,
        context,
        playing,
        player,
        currentTrack,
        play,
        toggle,
        next,
        prev,
        seek,
        setVol,
        getVol,
        getState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
