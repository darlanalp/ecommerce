import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { mockProducts } from 'product-data-access';

@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})

export class ProductSearchComponent {
  control = new FormControl('');
  products = mockProducts

}
