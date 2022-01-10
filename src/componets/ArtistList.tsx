import { navigate } from "@reach/router";
import React from "react";
import { IoAddCircle, IoRadio } from "react-icons/io5";

import useFollowers from "../utils/hooks/useFollowers";
import { Artist } from "../utils/models";

import IconButton from "./IconButton";

interface Props {
  numbered?: boolean;
  title?: string;
  artists?: Artist[];
  isLoading?: boolean;
  renderSide?: () => React.ReactNode;
  onOpenRadio: (artist: Artist) => void;
}
export default function ArtistList({ numbered, title, artists, isLoading, renderSide, onOpenRadio }: Props) {
  const { format } = useFollowers();

  return (
    <div>
      {title && (
        <div className="flex item-center justify-between">
          <div className="text-xl font-bold">{title}</div>
          {renderSide && renderSide()}
        </div>
      )}
      {isLoading ? (
        "Loading..."
      ) : !artists?.length ? (
        <div className="text-gray-600 text-sm font-bold">No artists found</div>
      ) : (
        artists.map((x, i) => (
          <div key={i} className="mt-4 p-4 bg-gray-200 hover:ring-2 hover:ring-white transition-all">
            <div className="flex items-center">
              {numbered && <div className="flex-none w-12 mr-2 flex items-center justify-center font-bold text-xl">{i + 1}.</div>}
              <img
                src={x.image}
                alt={`Spotify provided profile for ${x.name}`}
                className="w-16 h-16 object-center object-cover mr-4 flex-none"
              />
              <div className="truncate flex-1">
                <div className="text-gray-600 text-xs">{format(x.followers)} Followers</div>
                <div className="font-bold truncate">{x.name}</div>
                <div className="h-2 bg-gray-300 overflow-hidden rounded-full w-full mt-2">
                  <div className="h-full rounded-full bg-white" style={{ width: x.popularity + "%" }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <IconButton
                color="dark"
                onClick={() => {
                  onOpenRadio(x);
                  navigate("/home/artist-radio");
                }}
              >
                <div className="text-sm text-gray-600 mr-2">Go to Radio</div>
                <IoRadio size={24} />
              </IconButton>
              <div className="w-4"></div>
              <IconButton onClick={() => {}} color="dark">
                <div className="text-sm text-gray-600 mr-2">Add to playlist</div>
                <IoAddCircle size={24} />
              </IconButton>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
