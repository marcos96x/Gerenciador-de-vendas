import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueComponent } from './estoque.component';



@NgModule({
  declarations: [EstoqueComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EstoqueComponent
  ]
})
export class EstoqueModule { }
