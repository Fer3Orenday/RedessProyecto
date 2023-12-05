import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = '94d680d9059f4c79ba128849bc0fcfcb'; // Reemplaza con tu Client ID de Spotify
  private redirectUri = 'http://localhost:4200';
  private clientSecret = '8411794e928b493d9c3c7af9ca93000b'; // Reemplaza con tu Client Secret de Spotify
  private authorizeUrl = 'https://accounts.spotify.com/authorize';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(private http: HttpClient) { }

  initiateAuthorization(): void {
    window.location.href = `${this.authorizeUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=user-read-private`;
  }

  exchangeCodeForToken(code: string): Observable<any> {
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirectUri}&client_id=${this.clientId}&client_secret=${this.clientSecret}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.http.post(this.tokenUrl, body, { headers });
  }

  getUserInfo(token: string): Observable<any> {
    const userInfoUrl = 'https://api.spotify.com/v1/me';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(userInfoUrl, { headers });
  }

}
