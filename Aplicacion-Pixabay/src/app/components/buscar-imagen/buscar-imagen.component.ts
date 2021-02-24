import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  nombreImagen: string = ''

  constructor( private imagenSerive: ImagenService ) { }

  ngOnInit(): void {
  }

  buscarImagenes() {
    if (this.nombreImagen === '') {
      this.imagenSerive.setError('Agrega un texto de Busqueda')
      return
    }

    this.imagenSerive.enviarTerminoBusqueda(this.nombreImagen)
  }

}
