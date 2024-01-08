import { Product } from './../../../../../../data-access/product/src/lib/models/product.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchService, mockProducts } from 'product-data-access';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { __values } from 'tslib';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged, filter, switchMap, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})

export class ProductSearchComponent implements OnInit {
  control = new FormControl('', { nonNullable: true });
  products = mockProducts
  //Um dica: sempre colocamos por uma questão de padrão o $ no nome da variavel para indicar que é um observable
  products$!: Observable<Product[]>
  constructor(private productSearchService: ProductSearchService) {

  }

  ngOnInit(): void {

    //Toda vez que o valor do controle mudar quero ser notificado
    //Dicas:
    //Não usar subscriber dentro de subscriber, a dica é  utilizar pipe do RXJS
    //Sempre que possivel evite os subscribes
    //-- O pipe recebe um observable no inicio, ele trata e sai de outra forma (retorna) 
    this.products$ = this.control.valueChanges.pipe(
      //------------------------- 
      //Operadores de filtrage
      //------------------------- 
      //permite emitir um valor somente se um determinado período de tempo tiver passado desde o último valor emitido.
      //Exemplo: vc digita algo no input, nesse tem de 400 mmm ele pega tudo digitado e envia, sem ele tudo que vc digitar seria já enviado um a um
      debounceTime(400),
      //permite emitir apenas valores que sejam diferentes do valor anterior.
      //Se vc digitar novamente o mesmo valor ele não chama de novo, isso evitar que a api faça requisições desnecessárias.
      //por exemplo, vc digita "teste", depois apaga e digita "teste" de novo, ele não vai ser reativo novamente
      distinctUntilChanged(),
      //permite filtrar os valores emitidos por um observable. A função de filtragem é passada como argumento ao operador e é aplicada a cada valor emitido.
      filter(value => value.length > 1),
      //------------------------- 
      //Operadores de transformação
      //------------------------- 
      //map(value => `Vc digitou:${value}`), //quando quiser retornar uma string e objeto utilize o map, se quiser que retorno um ouro observable use o switchMap
      //permite substituir um observable por outro. O novo observable é emitido quando o valor atual do observable original é alterado.
      switchMap(value => this.productSearchService.searchByName(value)),
    );
  }
}
