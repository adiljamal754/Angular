import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public id: number=0;
  public name: string="";
  public description: string="";
  public price: number=0;


  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    
  }

}
