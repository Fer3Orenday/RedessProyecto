export interface SpotifyUserProfile {
    display_name: string;
    email: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null | string;
        total: number;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    type: string;
    uri: string;
}

export interface SpotifyImage {
    height: null | number;
    url: string;
    width: null | number;
}

export interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null | string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface SpotifyImage {
    height: null | number;
    url: string;
    width: null | number;
}

export interface SpotifyFollowedArtistsResponse {
    artists: {
      items: SpotifyArtist[];
      next: string | null;
      total: number;
      cursors: {
        after: string | null;
      };
      limit: number;
      href: string;
    };
  }
  