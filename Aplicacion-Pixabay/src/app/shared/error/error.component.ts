import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit,OnDestroy {

  texto: string = ''
  mostrar: boolean =false
  subscripcion: Subscription

  constructor(private imagenService: ImagenService) {
    this.subscripcion = this.imagenService.getError().subscribe(data => {
      this.mostrarMensaje()
      this.texto = data
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.subscripcion.unsubscribe()
  }

  mostrarMensaje(){
    this.mostrar = true
    setTimeout(() => {
      this.mostrar = false
    }, 2000);
  }

}
