import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';



@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LogsComponent
  ]
})
export class LogsModule { }
