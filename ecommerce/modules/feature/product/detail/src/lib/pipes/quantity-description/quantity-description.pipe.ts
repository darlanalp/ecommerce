import { Pipe, PipeTransform } from '@angular/core';

//Aula do dia 18/12/2023

@Pipe({
  name: 'quantityDescription',
  standalone: true,
})
export class QuantityDescriptionPipe implements PipeTransform {
  transform(quantity: number): string {
    //=== indica que  vai testa o valor e o tipo tbm, sempre usar ele
    if (quantity === 0) return "Produto indisponível"
    if (quantity === 1) return "Útimo produto em estoque. Corra antes que esgote"
    return `${quantity} disponíveis`
  }
}
