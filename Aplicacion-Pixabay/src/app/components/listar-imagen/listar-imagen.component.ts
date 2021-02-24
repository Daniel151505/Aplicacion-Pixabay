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
  loading = false
  imagenPorPagina = 30
  paginaActual = 1
  calcularTotalPaginas = 0

  constructor(private imagenSerive: ImagenService) {
    this.subscription = this.imagenSerive.getTerminoBusqueda().subscribe(data => {
      this.termino = data
      this.loading = true
      this.obtenerImagenes()
      
    })
   }

  ngOnInit(): void {
  }

  obtenerImagenes() {
    this.imagenSerive.getImagenes(this.termino).subscribe(data => {
      
      this.loading = false
      this.paginaActual = 1

      if (data.hits.length === 0) {
        this.imagenSerive.setError('Opss... no encontramos ningun resultado')
        return
      }

      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenPorPagina) 

      this.listarImagenes = data.hits

    }, error => {
        this.imagenSerive.setError('Opss.. ocurrio un error')
         this.loading = false
      })
  }

  paginaAnterior() {
    this.paginaActual--
  }

  paginaPosterior() {
    this.paginaActual++
  }

  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false
    } else {
      return true
    }
  }

  paginaPosteriorClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false
    } else {
      return true
    }
  }

}
