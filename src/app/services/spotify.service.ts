import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyArtist, SpotifyFollowedArtistsResponse, SpotifyUserProfile } from '../interface/spotifyInterface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = 'f18695bbc9614f358fa7011ffe1f791a'; // Reemplaza con tu Client ID de Spotify
  private redirectUri = 'http://localhost:4200';
  private clientSecret = '7ec38afa524640c0a98d8f30f0d6eede'; // Reemplaza con tu Client Secret de Spotify
  private authorizeUrl = 'https://accounts.spotify.com/authorize';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';
  private scopes = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read user-follow-read';

  constructor(private http: HttpClient) { }

  initiateAuthorization(): void {
    window.location.href = `${this.authorizeUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${encodeURIComponent(this.scopes)}&response_type=code`;
  }

  exchangeCodeForToken(code: string): Observable<any> {
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}&client_id=${this.clientId}&client_secret=${this.clientSecret}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.http.post(this.tokenUrl, body, { headers });
  }

  getFollowedArtists(accessToken: string): Observable<SpotifyFollowedArtistsResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<SpotifyFollowedArtistsResponse>(`${this.apiUrl}/me/following?type=artist`, { headers });
  }

  getTopArtists(accessToken: string): Observable<SpotifyArtist[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<SpotifyArtist[]>(`${this.apiUrl}/me/top/artists`, { headers });
  }

  getUserInfo(token: string): Observable<SpotifyUserProfile> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<SpotifyUserProfile>(`${this.apiUrl}/me`, { headers });
  }

}
