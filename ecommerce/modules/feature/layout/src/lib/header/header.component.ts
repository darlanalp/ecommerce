import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  //required: true =>Recurso habilitado a partir do angular 16, indica que é obrigatorio passar o title
  @Input({required: true}) title = '';

  //Exemplo: angula anterior ao 16
  //@Input() title = ''; //Indica que o title será preenchido por quem vai consumir o componente
}
