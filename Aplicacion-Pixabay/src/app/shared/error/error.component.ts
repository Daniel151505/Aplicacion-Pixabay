import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  texto: string = ''
  mostrar: boolean =false
  subscripcion: Subscription

  constructor(private imagenService: ImagenService) {
    this.subscripcion = this.imagenService.getError().subscribe(data => {
      this.mostrar = true
      this.texto = data
    })
   }

  ngOnInit(): void {
  }

}
