import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationPeople } from '../interface/profileInterface';

@Injectable({
  providedIn: 'root'
})

export class CitasService {
  private serverOne = 'ipAddress';

  private arrayInfo: InformationPeople[] = [
    { nombre: 'Fernada Orenday', numero: '4492610397' },
    { nombre: 'Fernada Hermosillo Orenday', numero: '4492610398' },
  ];

  constructor(private http: HttpClient) { }

  getInformationPeople(option: string): InformationPeople[] {
    if (option === "Genero") {
      return this.arrayInfo;
    } else if (option === "Artista") {
      return this.arrayInfo;
    } else if (option === "Cancion") {
      return this.arrayInfo;
    }
    return this.arrayInfo;
    // this.http.post(this.serverOne, profileObject);
  }
}
