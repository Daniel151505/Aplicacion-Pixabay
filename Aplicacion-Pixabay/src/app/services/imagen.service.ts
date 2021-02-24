import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private $error = new Subject<string>()

  constructor() { }

  setError(mensaje: string){
    this.$error.next(mensaje)
  }

}
