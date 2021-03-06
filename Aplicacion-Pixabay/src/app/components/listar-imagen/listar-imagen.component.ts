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
      this.paginaActual = 1
      this.loading = true
      this.obtenerImagenes()
      
    })
   }

  ngOnInit(): void {
  }

  obtenerImagenes() {
    this.imagenSerive.getImagenes(this.termino, this.imagenPorPagina, this.paginaActual).subscribe(data => {
      setTimeout(() => {
        this.loading = false
      }, 3000);
      

      if (data.hits.length === 0) {
        this.imagenSerive.setError('Lo siento... no encontramos ningun resultado')
        return
      }

      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenPorPagina) 

      this.listarImagenes = data.hits

    }, error => {
        this.imagenSerive.setError('Lo siento... ocurrio un error')
         this.loading = false
      })
  }

  paginaAnterior() {
    this.paginaActual--
    this.loading=true
    this.listarImagenes = []
    this.obtenerImagenes()
  }

  paginaPosterior() {
    this.paginaActual++
    this.loading=true
    this.listarImagenes = []
    this.obtenerImagenes()
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
