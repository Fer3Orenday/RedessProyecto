import { Component } from '@angular/core';

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
