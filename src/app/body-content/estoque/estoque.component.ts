import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  public addProductModal = false;
  public classModal = 'fadeIn';
  public alertClass = '';
  public alertMessage = '';
  public qtdRemove = 0;
  public qtdAdd = 0;
  public searchText = '';
  public newProduct: any = {
    id: 0,
    name: '',
    price: 0,
    qtd: 0
  };

  public produtos: any[] = [];


  verifyNextProductId() {
    let maxId = 0;
    this.produtos.map((produto) => {

      if (produto.id > maxId) {
        maxId = produto.id;
      }
    });

    return maxId + 1;
  }

  handleNewProduct(event, type) {
    switch (type) {
      case 'name':
        if (event.target.value.trim().length > 0) {
          this.newProduct.name = event.target.value;
        }
        break;
      case 'price':
        if (event.target.value > 0) {
          this.newProduct.price = event.target.value;
        }
        break;
      case 'qtd':
        this.newProduct.qtd = event.target.value;
        break;
      default:
        console.log('Error in the handle new product!');
        break;
    }

  }

  handleAddOrRemoveItens(event, type) {
    switch (type) {
      case 'add':
        this.qtdAdd = event.target.value;
        break;
      case 'remove':
        this.qtdRemove = event.target.value;
        break;
      default:
        this.qtdRemove = 0;
        this.qtdAdd = 0;
        break;
    }
  }

  handleSearchField(event) {
    this.searchText = event.target.value;
    if (this.searchText.length > 0) {
      const newProducts = this.produtos.filter((produto) => {
        return produto.name.includes(this.searchText);
      });
      this.produtos = newProducts;
    } else {
      this.produtos = JSON.parse(localStorage.getItem('produtos'));
    }

  }

  addNewProductModal() {
    this.addProductModal = !this.addProductModal;
    this.classModal = 'fadeIn';
  }
  addNewProduct() {
    this.newProduct.id = this.verifyNextProductId();
    if (this.newProduct.name.trim().length > 0 && this.newProduct.price > 0) {
      this.produtos.push(this.newProduct);
      this.newProduct = {
        name: '',
        price: 0,
        qtd: 0
      };
      this.save();
      this.addProductModal = !this.addProductModal;
      this.alertClass = 'green white-text';
      this.alertMessage = 'Produto inserido com sucesso!';

    } else {
      this.alertClass = 'red white-text';
      this.alertMessage = 'Campos obrigatórios inválidos!';
    }
  }

  addQtdItem(id) {
    if (this.qtdAdd === 0) {
      this.alertClass = 'red white-text';
      this.alertMessage = 'Para adicionar itens deste produto insira uma quantidade!';
    } else {
      for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].id === id) {
          Number(this.produtos[i].qtd += Number(this.qtdAdd));
        }
      }
      this.save();
      this.alertClass = 'green white-text';
      this.alertMessage = 'Itens inseridos com sucesso!';
      this.qtdAdd = 0;
    }
  }

  removeQtdItem(id) {
    if (this.qtdRemove === 0) {
      this.alertClass = 'red white-text';
      this.alertMessage = 'Para remover itens deste produto insira uma quantidade!';
    } else {
      for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].id === id) {
          Number(this.produtos[i].qtd -= this.qtdRemove);
          if (this.produtos[i].qtd < 0) {
            this.produtos[i].qtd = 0;
            this.alertClass = 'yellow black-text';
            this.alertMessage = 'Não é possível ter itens negativos! Este item foi zerado.';
            this.save();
          } else {
            this.alertClass = 'green white-text';
            this.alertMessage = 'Itens retirados com sucesso!';
            this.qtdRemove = 0;
            this.save();
          }
        }
      }
    }
  }

  save() {
    const data = JSON.stringify(this.produtos);
    localStorage.setItem('produtos', data);
  }

  delete(id) {
    const newProducts = this.produtos.filter((produto) => {
      return produto.id !== id;
    });

    this.produtos = newProducts;
    this.save();
  }

  constructor() { }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('produtos'));

    if (data) {
      this.produtos = data.length > 0 ? data : [];
    }

  }

}
