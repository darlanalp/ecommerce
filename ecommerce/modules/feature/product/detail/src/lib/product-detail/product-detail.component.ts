import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

/**
 * Este exemplo é para demonstrar que podemos criar funcções separadas 
 * utilizando o inject, que é uma forma alternativa de injeção de depedência.
 * Pois se não usar esse cara, deveria ser criado no construtor da classe um objeto e depois utilizar,
 * e com o inject é possivel isolar regras deixando mais reaproveitavel o código
 * @returns 
 */
function getParamsId(): Observable<string> {

  //vamos utilizar o pipe para usar o pipe async no html, exemplo: {{id$ | async}}, desta forma não precisa
  //fazer o subscriber, evitando assim o vazamento de memória.
  return inject(ActivatedRoute).params.pipe(map((params) => params['id']));
}

@Component({
  selector: 'lib-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})

export class ProductDetailComponent {
  constructor() { }
  id$ = getParamsId();
}
