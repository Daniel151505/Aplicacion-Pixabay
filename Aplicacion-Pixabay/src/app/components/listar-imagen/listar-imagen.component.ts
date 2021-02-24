import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  termino:string = ''
  subscription: Subscription
  listarImagenes: any[] = []

  constructor(private imagenSerive: ImagenService) {
    this.subscription = this.imagenSerive.getTerminoBusqueda().subscribe(data => {
      this.termino = data
      this.obtenerImagenes()
    })
   }

  ngOnInit(): void {
  }

  obtenerImagenes() {
    this.imagenSerive.getImagenes(this.termino).subscribe(data => {
      if (data.hits.length === 0) {
        this.imagenSerive.setError('Opss... no encontramos ningun resultado')
        return
      }

      this.listarImagenes = data.hits

    }, error => {
        this.imagenSerive.setError('Opss.. ocurrio un error')
    })
  }

}
