import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interface/profileInterface';
import {
  SpotifyArtist,
  SpotifyFollowedArtistsResponse,
} from '../interface/spotifyInterface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private serverOne = 'http://192.168.0.16:8080';
  private serverTwo = 'hhtp://192.168.0.15:3000';

  constructor(private http: HttpClient) {}

  //Obtener informacion del cliente 
  savePersonalInfo(profileObject: Profile): Observable<any> {
    console.log('====================================');
    console.log(profileObject);
    console.log('====================================');
    return this.http.post(`http://192.168.0.16:8080/guardar-datos`, profileObject);

    // this.http.post(this.serverOne, profileObject);
  }


  //Obtener informacion de artistas
  savePersonalTopArtist(profileObject: any) {
    console.log(profileObject);
    
    console.log('==================================== Server');
    console.log(profileObject);
    console.log('====================================');
    return this.http.post(`http://192.168.0.16:8080/guardar-artista`, profileObject);
    // this.http.post(this.serverOne, profileObject);
  }


  //obtener el genero 
  savePersonalGenero(profileObject: any) {
    console.log('==================================== Server');
    console.log(profileObject);
    console.log('====================================');
    return this.http.post(`http://192.168.0.16:8080/guardar-genero`, profileObject);
    // this.http.post(this.serverOne, profileObject);
  }

  //obtener album 
  savePersonalAlbum(profileObject: any) {
    console.log('==================================== Server');
    console.log(profileObject);
    console.log('====================================');
    return this.http.post(`http://192.168.0.15:3000/guardar-album`, profileObject);
    // this.http.post(this.serverOne, profileObject);
  }


  savePersonalFollowedArtist(profileObject: SpotifyFollowedArtistsResponse) {
    console.log('====================================');
    console.log(profileObject);
    console.log('====================================');
    // this.http.post(this.serverOne, profileObject);
  }

  obtenerDatosArtistas(): Observable<any> {
    return this.http.get<any>('http://192.168.0.16:8080/obtener-artistas');
  }

  obtenerDatosAlbum(): Observable<any> {
    return this.http.get<any>('http://192.168.0.15:3000/obtener-album');
  }

  obtenerDatosGeneros(): Observable<any> {
    return this.http.get<any>('http://192.168.0.16:8080/obtener-genero');
  }



  
}
