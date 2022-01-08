import React from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "@reach/router";
import { IoPlay } from "react-icons/io5";

import { Track } from "../utils/models";
import useDuration from "../utils/hooks/useDuration";
import { usePlayer } from "../utils/Player";

export default function Dashboard(props: RouteComponentProps) {
  const { data, isLoading } = useQuery<Track[]>("/recents");
  const { format } = useDuration();
  const { play } = usePlayer();

  return (
    <div className="p-4">
      <div>
        <div className="font-bold text-xl">Recently played tracks</div>
        {isLoading
          ? "Loading..."
          : data?.map((x, i) => (
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
                <div
                  className="ml-4 flex-none transition-all hover:scale-110 cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => play(`spotify:track:${x.id}`)}
                >
                  <IoPlay size={32} />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
