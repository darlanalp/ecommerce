import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})

//Aula dia 03/01/2024
export class CartService {

  //Será a lista de produto que o usuário vai adicionar no carrinho
  private cartSubject = new BehaviorSubject<Product[]>([]);

  //Variavel publica para expor o subject, por questão de boa prática
  cart$ = this.cartSubject.asObservable();

  //Cria um pipe a partir do observable de carrinho fazendo um map para pegar somente a quantidade
  productQuantity$ = this.cartSubject.pipe(map((products) => products.length));

  addToCart(product: Product) {

    //Pega os produtos já adicionados
    const cartAdded = this.cartSubject.getValue();
    //.next => adiciona/emite um novo valor
    this.cartSubject.next([...cartAdded, product]);
    console.log(this.cartSubject.getValue());
  }

}
