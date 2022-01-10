import { useQuery, useQueryClient } from "react-query";
import { Artist, Track } from "../models";
import { mutationFn } from "../queryClient";
import useMe from "./useMe";

type ArtistRadioResponse = {
  artist?: Artist;
  tracks: Track[];
};

export default function usePlaylists() {
  const cache = useQueryClient();
  const { me } = useMe();
  const { data: availableGenres } = useQuery<string[]>("/available-genres");

  const getRadioTracks = async (artist: Artist, genres: string[]) => {
    const key = `/artist-radio/${artist.id}`;
    const cached = cache.getQueryData<ArtistRadioResponse>(key);
    if (cached) return cached;

    const seedGenres = genres.filter((x) => availableGenres?.includes(x)).slice(0, 5);
    if (seedGenres.length === 0) return null;

    const tracks = await mutationFn([key, { genres, country: me?.country || "US" }, "POST"]);
    cache.setQueryData<ArtistRadioResponse>(key, () => ({ tracks, artist }));
    return { artist, tracks };
  };

  return { availableGenres, getRadioTracks };
}
