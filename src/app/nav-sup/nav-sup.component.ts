import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-sup',
  templateUrl: './nav-sup.component.html',
  styleUrls: ['./nav-sup.component.css']
})
export class NavSupComponent implements OnInit {

  @Output() navigation = new EventEmitter();
  public navegacao = 'estoque';

  someNavigation(nav) {
    this.navegacao = nav;

    switch (nav) {
      case 'estoque':
        this.navigationToStock();
        break;
      case 'venda':
        this.navigationToSale();
        break;
      case 'relatorio':
        this.navigationToLogs();
        break;
      default:
        this.navigationToStock();
        break;
    }
  }

  navigationToStock() {
    this.navigation.emit({navigation: 'estoque'});
  }

  navigationToSale() {
    this.navigation.emit({navigation: 'venda'});
  }

  navigationToLogs() {
    this.navigation.emit({navigation: 'relatorio'});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
