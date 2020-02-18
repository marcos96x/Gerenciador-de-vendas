import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { NavSupComponent } from './nav-sup/nav-sup.component';
import { LogsComponent } from './body-content/logs/logs.component';
import { EstoqueComponent } from './body-content/estoque/estoque.component';
import { VendaComponent } from './body-content/venda/venda.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyContentComponent,
    NavSupComponent,
    LogsComponent,
    EstoqueComponent,
    VendaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
