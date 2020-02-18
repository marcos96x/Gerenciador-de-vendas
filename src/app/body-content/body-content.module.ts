import { BodyContentComponent } from './body-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueModule } from './estoque/estoque.module';



@NgModule({
  declarations: [BodyContentComponent],
  imports: [
    CommonModule,
    EstoqueModule
  ]
})
export class BodyContentModule { }
