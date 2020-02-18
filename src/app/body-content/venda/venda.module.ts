import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaComponent } from './venda.component';



@NgModule({
  declarations: [VendaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VendaComponent
  ]
})
export class VendaModule { }
