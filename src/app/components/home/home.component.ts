import { Component } from '@angular/core';
import { InformationPeople } from 'src/app/interface/profileInterface';
import { SpotifyArtist, SpotifyFollowedArtistsResponse, SpotifyUserProfile } from 'src/app/interface/spotifyInterface';
import { CitasService } from 'src/app/services/citas.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  opcionSeleccionada: string = '';
  celular: string = '';
  mostrarTablaGenero: boolean = false;
  mostrarTablaCancion: boolean = false;
  mostrarTablaArtista: boolean = false;

  accessToken: any = 'EL_TOKEN_DEL_USUARIO';
  userProfile: SpotifyUserProfile | undefined;
  userTopArtist: SpotifyArtist[] | undefined;
  userFollowedArtist: SpotifyFollowedArtistsResponse | undefined;
  arrayInfo: InformationPeople[] | undefined;

  constructor(private spotifyService: SpotifyService,
    private profileService: ProfileService,
    private citasService: CitasService
  ) {
    this.accessToken = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getUserProfile();
    this.getInformationPeople();
  }

  getInformationPeople() {
    this.arrayInfo = this.citasService.getInformationPeople(this.opcionSeleccionada);
  }

  getUserProfile() {
    this.spotifyService.getUserInfo(this.accessToken).subscribe(
      (data) => {
        console.log('User Profile:', data);
        this.userProfile = data;
        this.profileService.savePersonalInfo(
          {
            address: 'N/A',
            email: data.email,
            id: data.id,
            lasName: data.display_name,
            name: data.display_name,
          }
        )
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.spotifyService.getTopArtists(this.accessToken).subscribe(
      (data) => {
        console.log('Artistas que le gustan mas:', data);
        this.userTopArtist = data;
        this.profileService.savePersonalTopArtist(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.spotifyService.getFollowedArtists(this.accessToken).subscribe(
      (data) => {
        console.log('Artistas que sigue:', data);
        this.userFollowedArtist = data;
        this.profileService.savePersonalFollowedArtist(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionada = opcion;
    this.mostrarTablaGenero = false;
    this.mostrarTablaCancion = false;
    this.mostrarTablaArtista = false;
  }

  buscarPareja() {
    if (this.celular.trim() === '') {
      alert('Por favor, ingrese su número de celular.');
      return;
    }

    if (this.opcionSeleccionada === 'Genero') {
      this.mostrarTablaGenero = true;
    }
    if (this.opcionSeleccionada === 'Artista') {
      this.mostrarTablaArtista = true;
    }
    if (this.opcionSeleccionada === 'Cancion') {
      this.mostrarTablaCancion = true;
    }
  }
}
