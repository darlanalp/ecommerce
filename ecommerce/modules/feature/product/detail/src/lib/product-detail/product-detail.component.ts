import { Product } from './../../../../../../data-access/product/src/lib/models/product.model';
import { CartService, ProductSearchService } from 'product-data-access';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ProductCardComponent } from 'product-ui';
import { MatButtonModule } from '@angular/material/button';
import { QuantityDescriptionPipe } from '../pipes/quantity-description/quantity-description.pipe';

//Aula do dia 18/12/2023

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
  imports: [CommonModule, ProductCardComponent, MatButtonModule, QuantityDescriptionPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})

export class ProductDetailComponent {

  constructor(private productSearchService: ProductSearchService, public cartService: CartService) { }
  product$: Observable<Product> = getParamsId().pipe(
    switchMap(id => this.productSearchService.getById(id))
  );
}
