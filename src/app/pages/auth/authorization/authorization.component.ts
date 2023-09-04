import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import {UserService} from "../../../services/user/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

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
  showCardNumber: boolean;
  @Input() inputProp = 'test';


  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private http: HttpClient) { }


  ngOnInit(): void {
    this.authTextButton = 'Авторизация'

  }
  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  vipStatusSelected():void{
    this.showCardNumber = !this.showCardNumber;
  }

  onAuth(ev:Event):void{
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber:this.cardNumber
    }

    this.http.post<{access_token: string, id: string }>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {

      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);
      this.router.navigate(['tickets/tickets-list']);

    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });

  }

}


