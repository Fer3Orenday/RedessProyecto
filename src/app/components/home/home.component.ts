import { Component } from '@angular/core';
import { InformationPeople } from 'src/app/interface/profileInterface';
import {
  SpotifyArtist,
  SpotifyFollowedArtistsResponse,
  SpotifyUserProfile,
} from 'src/app/interface/spotifyInterface';
import { CitasService } from 'src/app/services/citas.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  userTopAlbums: any[] | undefined;
  userFollowedArtist: SpotifyFollowedArtistsResponse | undefined;
  arrayInfo: InformationPeople[] | undefined;

  artistas: any;
  albums: any;
  generos: any;

  myArtistNames: any;
  myArtistGenero: any;
  myAlbumNames: any;

  match: any;

  constructor(
    private spotifyService: SpotifyService,
    private profileService: ProfileService,
    private citasService: CitasService
  ) {
    this.accessToken = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getUserProfile();
    this.obtenerDatos();
  }

  // datos usuario
  getUserProfile() {
    this.spotifyService.getUserInfo(this.accessToken).subscribe(
      (dataUser) => {
        console.log('User Profile:', dataUser);
        this.userProfile = dataUser;
        this.profileService
          .savePersonalInfo({
            address: 'N/A',
            email: dataUser.email,
            id: dataUser.id,
            lasName: dataUser.display_name,
            name: dataUser.display_name,
          })
          .subscribe(
            (data) => {
              console.log('respuesta:', data);
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        this.spotifyService.getTopArtists(this.accessToken).subscribe(
          (data) => {
            console.log('Artistas que le gustan mas:', data.items);
            this.userTopArtist = data;
            const artistNames: string[] = data.items.map(
              (artist: any) => artist.name
            );
            this.myArtistNames = artistNames;
            this.profileService
              .savePersonalTopArtist({
                user: dataUser.display_name,
                email: dataUser.email,
                artistNames,
              })
              .subscribe(
                (data) => {
                  console.log('respuesta Artistas:', data);
                },
                (error) => {
                  console.error('Error Artista:', error);
                }
              );
          },
          (error) => {
            console.error('Error:', error);
          }
        );

        //genero
        this.spotifyService.getFollowedArtists(this.accessToken).subscribe(
          (data) => {
            console.log('Artistas que sigue:', data);
            this.userFollowedArtist = data;
            this.profileService.savePersonalFollowedArtist(data);
            const artistGenero: string[] = data.artists.items.map(
              (artist: any) => artist.genres
            );
            this.myArtistGenero = artistGenero;
            this.profileService
              .savePersonalGenero({
                user: dataUser.display_name,
                email: dataUser.email,
                artistGenero,
              })
              .subscribe(
                (data) => {
                  console.log('respuesta Generos:', data);
                },
                (error) => {
                  console.error('Error Genero:', error);
                }
              );
          },
          (error) => {
            console.error('Error:', error);
          }
        );
        this.obtenerAlbums(dataUser);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    // artistas
  }

  obtenerAlbums(dataUser: any) {
    this.spotifyService.getTopAlbums(this.accessToken).subscribe(
      (data) => {
        console.log('Top Álbumes:', data.items);
        const albumNames: string[] = data.items.map(
          (album: any) => album.album.name
        );
        this.myAlbumNames = albumNames;
        this.profileService
          .savePersonalAlbum({
            user: dataUser.display_name,
            email: dataUser.email,
            albumes: albumNames,
          })
          .subscribe(
            (data) => {
              console.log('Respuesta Álbumes:', data);
            },
            (error) => {
              console.error('Error Álbum:', error);
            }
          );
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // album

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
      this.match = this.filtrarPorGenero();
    }
    if (this.opcionSeleccionada === 'Artista') {
      this.mostrarTablaArtista = true;
      this.match = this.filtrarPorArtista();
    }
    if (this.opcionSeleccionada === 'Cancion') {
      this.mostrarTablaCancion = true;
      this.match = this.filtrarPorAlbumes();
    }
  }

  obtenerDatos() {
    this.profileService.obtenerDatosAlbum().subscribe(
      (data) => {
        console.log('Album', data);
        this.albums = data;
      },
      (error) => {
        console.log('Album error', error);
      }
    );
    this.profileService.obtenerDatosArtistas().subscribe(
      (data) => {
        console.log('Artista', data);
        this.artistas = data;
      },
      (error) => {
        console.log('Album error', error);
      }
    );
    this.profileService.obtenerDatosGeneros().subscribe(
      (data) => {
        console.log('Genero', data);
        this.generos = data;
      },
      (error) => {
        console.log('Album error', error);
      }
    );
  }

  guardarMatch(item: any){
    console.log('hola');
    this.citasService.saveMatch({userName: this.userProfile?.display_name,matchName: item.name, email: item.email}).subscribe(

      (data) => {
        console.log('Match', data);
        alert("Se ha mandado un correo a la persona que haz hecho match");
      },
      (error) => {
        console.log('Match error', error);
      }
    );
  }

  filtrarPorAlbumes() {
    const nombresUnicos = new Set<string>();

    return this.albums.datos
      .filter((persona: any) => {
        // Verifica si todos los álbumes deseados están presentes en la lista de álbumes de la persona
        return (
          persona.albumes.filter((album: any) =>
            this.myAlbumNames.includes(album)
          )
        );
      })
      .filter((persona: any) => {
        // Filtra para mantener solo un registro por nombre de usuario
        const nombreUsuario = persona.user;
        if (!nombresUnicos.has(nombreUsuario)) {
          nombresUnicos.add(nombreUsuario);
          return true;
        }
        return false;
      })
      .map((persona: any) => {
        // Devuelve solo los nombres de usuario de las personas que tienen los álbumes deseados
        return { name: persona.user, email: persona.email, datos: [persona.albumes[0], persona.albumes[1], persona.albumes[2]]};
      });
  }
  filtrarPorGenero() {
    const nombresUnicos = new Set<string>();

    return this.generos.datos
      .filter((persona: any) => {
        // Verifica si todos los géneros deseados están presentes en la lista de géneros de la persona
        return (
          persona.artistGenero.filter((album: any) =>
            this.myArtistGenero.includes(album)
          )
        );
      })
      .filter((persona: any) => {
        // Filtra para mantener solo un registro por nombre de usuario
        const nombreUsuario = persona.user;
        if (!nombresUnicos.has(nombreUsuario)) {
          nombresUnicos.add(nombreUsuario);
          return true;
        }
        return false;
      })
      .map((persona: any) => {
        // Devuelve solo los nombres de usuario de las personas que tienen los géneros deseados
        return { name: persona.user, email: persona.email, datos: [persona.artistGenero[0], persona.artistGenero[1], persona.artistGenero[2]] };
      });
  }
  filtrarPorArtista() {
    const nombresUnicos = new Set<string>();

    return this.artistas.datos
      .filter((persona: any) => {
        // Verifica si todos los artistas deseados están presentes en la lista de artistas de la persona
        return (
          persona.artistNames.filter((artista: any) =>
            this.myArtistNames.includes(artista)
          )
        );
      })
      .filter((persona: any) => {
        // Filtra para mantener solo un registro por nombre de usuario
        const nombreUsuario = persona.user;
        if (!nombresUnicos.has(nombreUsuario)) {
          nombresUnicos.add(nombreUsuario);
          return true;
        }
        return false;
      })
      .map((persona: any) => {
        // Devuelve solo los nombres de usuario de las personas que tienen los artistas deseados
        return { name: persona.user, email: persona.email, datos: [persona.artistNames[0], persona.artistNames[1], persona.artistNames[2]] };
      });
  }
}
