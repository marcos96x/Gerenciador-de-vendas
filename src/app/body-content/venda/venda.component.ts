import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-venda',
    templateUrl: './venda.component.html',
    styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

    public alertClass = '';
    public alertMessage = '';

    public produtos: any = [];
    public qtdItensTemplate = 1;
    public qtdItem = 0;
    public totalVenda = 0;
    public vendaFinalizada = false;
    public produtosVenda: any = [
        {
            idVenda: 1,
            id: null,
            name: null,
            qtd: null,
            price: null
        }
    ];

    handleQtd(event) {
        this.qtdItem = event.target.value;
    }

    handleId(event) {
        const produtoComIdDigitado = this.produtos.filter((produto) => {
            return produto.id === event.target.value;
        });
        if (!produtoComIdDigitado || produtoComIdDigitado.length === 0) {
            this.alertMessage = 'Não existe um produto com esse código!';
            this.alertClass = 'red white-text';
            this.produtosVenda[this.produtosVenda.length - 1].name = 'Código inválido';
            this.produtosVenda[this.produtosVenda.length - 1].id = null;
        } else {
            this.alertMessage = '';
            this.alertClass = '';
            this.produtosVenda[this.produtosVenda.length - 1] = {
                idVenda: this.verifyNextProductId(),
                id: produtoComIdDigitado[0].id,
                name: produtoComIdDigitado[0].name,
                qtd: this.qtdItem,
                price: produtoComIdDigitado[0].price
            };
        }
    }

    verifyNextProductId() {
        let maxId = 0;
        this.produtosVenda.map((produto) => {

            if (produto.id > maxId) {
                maxId = produto.id;
            }

        });

        return maxId + 1;
    }

    addItem() {
        if (this.produtosVenda[this.produtosVenda.length - 1].id != null) {
            this.produtosVenda[this.produtosVenda.length - 1].qtd = this.qtdItem;
            this.totalVenda += Number((this.produtosVenda[this.produtosVenda.length - 1].price) * this.qtdItem);
            this.produtosVenda.push({
                idVenda: this.verifyNextProductId(),
                id: null,
                name: null,
                qtd: null,
                price: null
            });
            this.qtdItem = 0;
        } else {
            this.alertMessage = 'Campos do item anterior invalidos!';
            this.alertClass = 'red white-text';
        }
    }

    finalizaVenda() {
        if (this.totalVenda > 0) {
            this.alertMessage = '';
            this.alertClass = '';
            this.vendaFinalizada = true;
        } else {
            this.alertMessage = 'Para finalizar uma venda, você deve inserir alguns produtos!';
            this.alertClass = 'yellow black-text';
        }
    }

    logEmmit() {
        const produtosVendidos = this.produtosVenda.filter((produto) => {
            return produto.id != null;
        });
        for (let i = 0; i < this.produtos.length; i++) {
            for (let i2 = 0; i2 < produtosVendidos.length; i2++) {
                if (this.produtos[i].id === produtosVendidos[i2].id) {
                    const qtdFinal = this.produtos[i].qtd - produtosVendidos[i2].qtd;
                    if (qtdFinal < 0) {
                        this.alertMessage = 'O produto ' + this.produtos[i].name + ' não está disponível em estoque!';
                        this.alertClass = 'red white-text';
                    } else {
                        this.produtos[i].qtd = qtdFinal;
                    }
                }
            }
        }
        const data = JSON.stringify(this.produtos);
        localStorage.setItem('produtos', data);

        const logModelName = 'Relatório de ' + new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();

        this.produtosVenda = [
            {
                idVenda: 1,
                id: null,
                name: null,
                qtd: null,
                price: null
            }
        ];
        this.vendaFinalizada = false;

        // Atualiza o log já existente
        let logExistente = JSON.parse(localStorage.getItem('logs'));

        if (!logExistente || logExistente.length === 0) {
            logExistente = [];
        }
        const saberExistenciaLog = logExistente.filter((filtro) => {
            return filtro.title === logModelName;
        });
        if (saberExistenciaLog && saberExistenciaLog.length > 0) {
            // já existe um log disparado neste dia
            const newContent = {
                valorTotalArrecadado: this.totalVenda,
                vendasEfetuadas: [
                    produtosVendidos
                ],
                produtosAtualmenteNoEstoque: this.produtos
            };

            this.totalVenda = 0;
            const newLog = logExistente.map((log) => {
                if (log.title === logModelName) {
                    const logHelper = log;
                    logHelper.content.push(newContent);
                    return logHelper;
                }

                return log;
            });
            localStorage.setItem('logs', JSON.stringify(newLog));
        } else {
            const newLog = {
                title: logModelName,
                content: [
                    {
                        valorTotalArrecadado: this.totalVenda,
                        vendasEfetuadas: [
                            produtosVendidos
                        ],
                        produtosAtualmenteNoEstoque: this.produtos
                    }
                ]
            };
            logExistente.push(newLog);
            this.totalVenda = 0;
            localStorage.setItem('logs', JSON.stringify(logExistente));
        }



        this.alertMessage = 'Venda realizada com sucesso! O relatório que inclui a mesma já encontra-se disponível.';
        this.alertClass = 'green white-text';
    }


    constructor() { }

    ngOnInit(): void {
        const data = JSON.parse(localStorage.getItem('produtos'));

        if (data) {
            this.produtos = data;
        }
    }

}
