import React, { useEffect, useState } from "react";
import { navigate, RouteComponentProps } from "@reach/router";

import { Artist, Track } from "../utils/models";
import { usePlayer } from "../utils/Player";

import TrackList from "../componets/TrackList";
import usePlaylists from "../utils/hooks/usePlaylists";
import Button from "../componets/Button";
import IconButton from "../componets/IconButton";
import { IoPlay } from "react-icons/io5";

interface Props {
  artist?: Artist;
}
export default function ArtistRadio({ artist }: Props & RouteComponentProps) {
  const { availableGenres, getRadioTracks } = usePlaylists();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [needsGenres, setNeedsGenres] = useState(false);

  const { play } = usePlayer();

  const performGet = async () => {
    if (!artist) return;
    const seedGenres = (selectedGenres.length === 0 ? artist.genres : selectedGenres)
      .filter((x) => availableGenres?.includes(x))
      .slice(0, 3);

    if (seedGenres.length === 0) {
      setNeedsGenres(true);
      return;
    }

    setLoading(true);
    try {
      setSelectedGenres(seedGenres);
      const res = await getRadioTracks(artist, seedGenres);
      setTracks(res?.tracks || []);
      if (res) setNeedsGenres(false);
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    performGet();
  }, [artist]);

  if (!artist)
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="text-xl font-bold text-gray-600 mb-4 text-center">
          Missing artist data. Go back and select a new artist.
        </div>
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          <div className="text-white">Back to Dashboard</div>
        </Button>
      </div>
    );
  if (needsGenres)
    return (
      <div className="p-4">
        <div className="text-center text-gray-600 font-bold">
          Playlist could not be generated because it is missing seed genres. Please choose between one and five seed genres from
          the available ones below.
        </div>
        <div className="font-bold text-2xl my-4 text-center">{selectedGenres.length} / 3</div>
        <div className="flex items-center flex-wrap mb-4">
          {availableGenres?.map((x, i) => {
            const selected = selectedGenres.includes(x);
            return (
              <div
                key={i}
                onClick={() => {
                  if (selected) setSelectedGenres((prev) => prev.filter((y) => y !== x));
                  else if (selectedGenres.length !== 3) setSelectedGenres((prev) => [...prev, x]);
                }}
                className={`px-4 py-2 rounded-full hover:ring-2 mb-2 mr-2 ${
                  selected ? "bg-black hover:ring-white font-bold text-white" : "bg-gray-200 hover:ring-black text-black"
                }`}
              >
                {x}
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => {
            if (selectedGenres.length > 0 && selectedGenres.length < 4) performGet();
          }}
        >
          <div className="text-white font-bold">Get Playlist</div>
        </Button>
      </div>
    );
  return (
    <div className="p-4">
      <div className="text-xl">
        Radio based on <span className="font-bold">{artist.name}</span>
      </div>
      <div className="flex my-4 items-center justify-end w-full">
        <IconButton onClick={() => play(tracks.map((x) => `spotify:track:${x.id}`))}>
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
            <IoPlay size={32} />
          </div>
        </IconButton>
      </div>
      <TrackList isLoading={loading} tracks={tracks} />
    </div>
  );
}
