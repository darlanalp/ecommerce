import { ProductCardComponent } from './../../../../ui/product/src/components/product-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes), ProductCardComponent],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
