import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";

import ArtistList from "../componets/ArtistList";
import useTopArtists from "../utils/hooks/useTopArtists";
import { Artist, SpotifyTimeRange } from "../utils/models";

interface Props {
  onOpenRadio: (artist: Artist) => void;
}
export default function Dashboard({ onOpenRadio }: Props & RouteComponentProps) {
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>("short_term");
  const { artists, isLoading } = useTopArtists(timeRange);

  return (
    <div className="p-4">
      <ArtistList
        numbered
        title="Top artists"
        {...{ artists, isLoading, onOpenRadio }}
        renderSide={() => (
          <div className="ml-4">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as any)}>
              <option value="short_term">Very recent</option>
              <option value="medium_term">Recent</option>
              <option value="long_term">Past year</option>
            </select>
          </div>
        )}
      />
    </div>
  );
}
