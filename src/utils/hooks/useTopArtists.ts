import { useEffect } from "react";
import { useQuery } from "react-query";

import { Artist, SpotifyTimeRange } from "../models";

export default function useTopArtists(time_range?: SpotifyTimeRange) {
  const { data: artists, isLoading, refetch: getTopArtists } = useQuery<Artist[]>(`/top-artists/${time_range || "short_term"}`);
  useEffect(() => {
    getTopArtists();
  }, [time_range, getTopArtists]);

  return { artists, isLoading, getTopArtists };
}
