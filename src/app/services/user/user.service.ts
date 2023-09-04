import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string;


  constructor() { }

  getUser(): IUser {
   return this.user;
  };

  setUser(user: IUser):void {
   this.user = user ;
  };

  setToken(token: string):void {
    this.token = token;
  }

  getAllToken() {
    if(this.token){
      return this.token;
    } else {
      return  this.getFromStore();
    }
  }

  setToStore(token: string) {
    window.localStorage.setItem('userToken' ,token)
  }
  getFromStore(){
    return window.localStorage.getItem('userToken')
  }

}

