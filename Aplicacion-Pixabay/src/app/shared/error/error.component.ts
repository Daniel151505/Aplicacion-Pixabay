import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  texto: string = ''
  mostrar: boolean =false
  subscripcion: Subscription

  constructor() { }

  ngOnInit(): void {
  }

}
