import React from "react";
import { IoPlay } from "react-icons/io5";

import useDuration from "../utils/hooks/useDuration";
import { Track } from "../utils/models";
import { usePlayer } from "../utils/Player";

import IconButton from "./IconButton";

interface Props {
  title?: string;
  tracks?: Track[];
  isLoading?: boolean;
}
export default function TrackList({ title, tracks, isLoading }: Props) {
  const { format } = useDuration();
  const { play } = usePlayer();

  return (
    <div>
      {title && <div className="font-bold text-xl">{title}</div>}
      {isLoading
        ? "Loading..."
        : tracks?.map((x, i) => (
            <div
              key={i}
              className="flex justify-between items-center my-4 py-2 px-4 shadow-sm hover:shadow-md hover:ring-2 hover:ring-white transition-all bg-gray-200"
            >
              <div className="flex-1">
                <div className="font-bold">{x.name}</div>
                <div>
                  {x.artists.map((y, j) => (
                    <span
                      key={j}
                      className="hover:underline text-color-gray-600 cursor-pointer"
                      onClick={() => window.open(y.url, "_blank")}
                    >
                      {y.name}
                      {j === x.artists.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <span>{format(x.duration)}</span>
                  {x.explicit && (
                    <div className="flex items-center">
                      <span className="mx-2">&#183;</span>
                      <div className="bg-gray-600 h-4 w-4 flex items-center justify-center rounded-xs font-bold text-white">
                        E
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <IconButton margin={{ l: 16 }} color="dark" onClick={() => play([`spotify:track:${x.id}`])}>
                <IoPlay size={32} />
              </IconButton>
            </div>
          ))}
    </div>
  );
}
