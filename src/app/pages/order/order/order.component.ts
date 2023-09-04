import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {IOrder} from "../../../models/order-interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  constructor(private orderService:OrderService,
              private datePipe: DatePipe) { }

  cols = [
    {field: 'name'},
    {field: '_id', header: 'ID заказа'},
    {field: 'tourId', header: 'ID тура'},
    {field: 'age', header: 'Возраст'},
    {field: 'birthDay', header: 'День рождения'},
    {field: 'cardNumber', header: 'Номер карты'},
  ];

  orders: IOrder[];


  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe((data) => {
      this.orders = data;
    });
  }
  formatBirthDay(date: string): string | null {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }

}
