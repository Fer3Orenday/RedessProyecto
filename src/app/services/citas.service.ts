import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationPeople } from '../interface/profileInterface';

@Injectable({
  providedIn: 'root'
})

export class CitasService {
  constructor(private http: HttpClient) { }

  saveMatch(matchObject: any){
    return this.http.post(`http://172.16.152.2:3000/guardar-match`, matchObject);
  }
}
