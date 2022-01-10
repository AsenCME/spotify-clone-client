import { useQuery } from "react-query";
import { Track } from "../models";

export default function useRecentTracks() {
  const { data: tracks, isLoading, refetch: getRecentTracks } = useQuery<Track[]>("/recents");
  return { tracks, isLoading, getRecentTracks };
}
