import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrder} from "../../models/order-interface";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private servUrl = 'http://localhost:3000/order'

  constructor( private http: HttpClient) { }


  getAllOrder():Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.servUrl);
  }

}
