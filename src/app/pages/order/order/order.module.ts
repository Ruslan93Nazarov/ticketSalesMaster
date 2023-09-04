import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from "./order.component";
import {OrderRoutingModule} from "./order-routing.module";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    OrderComponent
  ],

  imports: [
    CommonModule,
    OrderRoutingModule,
    TableModule
  ]
})
export class OrderModule { }
