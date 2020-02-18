import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  public totalVendido: number;
  public produtosFalta: any[];
  public logs: any[];
  public logAtual = [];
  public vendasDia: any = [];
  public mostraLogs = false;
  private logModelName = 'Relatório de ' + new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  constructor() { }

  verLogs(modelName) {
    const logSerVisto = this.logs.filter((log) => {
      return log.title === modelName;
    });

    this.logAtual = logSerVisto;
    logSerVisto.map((log) => {
      log.content.map((content) => {
        this.vendasDia.push(content);
      });

    });
    this.mostraLogs = true;
    this.totalVendido = this.saberTotalVendido();
  }

  saberProdutosFaltando() {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    this.produtosFalta = produtos.filter((filtro) => {
      return filtro.qtd < 10;
    });
  }

  saberTotalVendido() {
    let count = 0;
    this.logAtual.map((log) => {
      log.content.map((cont) => {
        count += cont.valorTotalArrecadado;
      });
    });

    return count;
  }

  ngOnInit(): void {
    this.logs = JSON.parse(localStorage.getItem('logs'));

    if (!this.logs) {
      this.logs = [];
    }
    this.totalVendido = 0;
    this.saberProdutosFaltando();

    this.verLogs(this.logModelName);
  }

}
