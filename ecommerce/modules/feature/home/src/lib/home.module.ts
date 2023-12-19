import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes), MatCardModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
