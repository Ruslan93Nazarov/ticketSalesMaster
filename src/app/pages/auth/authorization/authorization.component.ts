import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges  {
  loginText = 'Логин';
  pswText = 'Пароль';
  login: string;
  psw: string;
  selectedValue:boolean;
  cardNumber:string;
  authTextButton:string;
  @Input() inputProp = 'test';


  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,  ) { }


  ngOnInit(): void {
    this.authTextButton = 'Авторизация'
  }
  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  vipStatusSelected():void{
  }

  onAuth(ev:Event):void{
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber:this.cardNumber
    }

    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser)
      this.router.navigate(['tickets/tickets-list']);
    } else {
      console.log('auth false');
      this.messageService.add({severity:'warn', summary:'Проверьте логин или пароль'});
    }


  }

}


