import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interface/profileInterface';
import { SpotifyArtist, SpotifyFollowedArtistsResponse } from '../interface/spotifyInterface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private serverOne = 'ipAddress';

  constructor(private http: HttpClient) { }

  savePersonalInfo(profileObject: Profile) {
    console.log('====================================');
    console.log(profileObject);
    console.log('====================================');
    // this.http.post(this.serverOne, profileObject);
  }

  savePersonalTopArtist(profileObject: SpotifyArtist[]) {
    console.log('====================================');
    console.log(profileObject);
    console.log('====================================');
    // this.http.post(this.serverOne, profileObject);
  }

  savePersonalFollowedArtist(profileObject: SpotifyFollowedArtistsResponse) {
    console.log('====================================');
    console.log(profileObject);
    console.log('====================================');
    // this.http.post(this.serverOne, profileObject);
  }
}
