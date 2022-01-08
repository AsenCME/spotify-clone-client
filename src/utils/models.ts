export type User = {
  id: string;
  url: string;
  display_name: string;
  email: string;
  image: string;
  followers: number;
  product: string;
};

export interface Track {
  artists: { id: string; name: string; href: string; url: string }[];
  duration: number;
  url: string;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  preview: string;
}

export interface WebPlaybackState {
  duration: number;
  paused: boolean; // Whether the current track is paused.
  position: number; // The position_ms of the current track.
  repeat_mode: 0 | 1 | 2; // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.
  shuffle: boolean; // True if shuffled, false otherwise.
  loading: boolean;
  playback_speed: number;
  timestamp: number;
  context: {
    uri: string; // The URI of the context (can be null)
    metadata: {}; // Additional metadata for the context (can be null)
  };
  disallows: {
    pausing?: boolean; // The current track. By default, these fields
    peeking_next?: boolean; // will either be set to false or undefined, which
    peeking_prev?: boolean; // indicates that the particular operation is
    resuming?: boolean; // allowed. When the field is set to `true`, this
    seeking?: boolean; // means that the operation is not permitted. For
    skipping_next?: boolean; // example, `skipping_next`, `skipping_prev` and
    skipping_prev?: boolean; // `seeking` will be set to `true` when playing an ad track.
  };
  track_window: {
    current_track: WebPlaybackTrack; // The track currently on local playback
    previous_tracks: WebPlaybackTrack[]; // Previously played tracks. Number can vary.
    next_tracks: WebPlaybackTrack[]; // Tracks queued next. Number can vary.
  };
}

export interface WebPlaybackTrack {
  uri: string; // Spotify URI
  id: string; // Spotify ID from URI (can be null)
  type: "track" | "episode" | "ad"; // Content type: can be "track", "episode" or "ad"
  media_type: "audio" | "video"; // Type of file: can be "audio" or "video"
  name: string; // Name of content
  is_playable: boolean; // Flag indicating whether it can be played
  album: { uri: string; name: string; images: { preferredSize: boolean; height?: number; width?: number; url: string }[] };
  artists: { uri: string; name: string }[];
  duration_ms: number;
}
