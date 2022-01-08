import React, { useEffect, useMemo, useState } from "react";
import useDuration from "../utils/hooks/useDuration";
import { WebPlaybackState } from "../utils/models";
import { usePlayer } from "../utils/Player";

export default function PlayerControls() {
  const [playing, setPlaying] = useState(false);
  const { currentTrack, player, play } = usePlayer();
  const [position, setPosition] = useState(0);
  const progress = useMemo(() => {
    return currentTrack ? (position / currentTrack.duration_ms) * 100 : 0;
  }, [position, currentTrack]);
  const { format } = useDuration();

  useEffect(() => {
    const interval = setInterval(async () => {
      const state = (await player?.getCurrentState()) as WebPlaybackState | undefined;
      if (state) setPosition(state.position);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentTrack]);

  if (!currentTrack) return null;
  return (
    <div className="fixed z-10 inset-x-0 bottom-0 p-4 bg-black text-white">
      <div className="flex items-center w-full">
        <img
          src={currentTrack.album.images[0]?.url}
          alt={`Album cover for the song ${currentTrack.name}`}
          className="w-12 h-12 object-fit flex-none"
        />
        <div className="ml-4 truncate flex-1">
          <div className="text-xs text-gray-100 truncate">{currentTrack.album.name}</div>
          <div className="text-sm font-bold truncate">{currentTrack.name}</div>
          <div className="text-xs text-gray-100 truncate">{currentTrack.artists.map((x) => x.name).join(", ")}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex-1 mr-4 h-2 rounded-full bg-gray-600 overflow-hidden">
          <div className="bg-white h-full rounded-full" style={{ width: progress + "%" }}></div>
        </div>
        <div className="w-[20%] text-center text-xs text-gray-300">
          {format(position)} / {format(currentTrack.duration_ms)}
        </div>
      </div>
    </div>
  );
}
