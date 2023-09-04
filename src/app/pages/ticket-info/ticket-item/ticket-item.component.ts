import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ITour, ITourLocation} from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IOrder} from "../../../models/order-interface";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit,OnDestroy {

  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;


  nearestTours: ITour[];
  toursLocation: ITourLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1,2,3];
  ticketSearchValue: string;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    // first get userInfo
    this.user = this.userService.getUser()

    // init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('',{validators:Validators.required}),
      lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    });

    // forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
    //     this.tourLocation = data[1];
    //     this.nearestTours = this.ticketService.transformData(data[0],data[1])
    //   }
    // );
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      const [nearestToursData, toursLocationData] = data;
      this.toursLocation = toursLocationData;
      this.nearestTours = this.ticketService.transformData(nearestToursData, toursLocationData);
    });




    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id'); // for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); // for queryParams
    const paramValueId = routeIdParam || queryIdParam;

       if (paramValueId) {
      this.ticketService.getTicketsById(paramValueId).subscribe((data)=>{
        this.ticket = data;
      })
    }
  }

  ngAfterViewInit():void {
    // setCardNumber
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });
  }


  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour():void{
    const type = Math.floor(Math.random() * this.searchTypes.length);
    // unsubscribe
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation) ;
    });

  }

  onSubmit():void{

  }

  initTour():void{
    const userData=this.userForm.getRawValue();
    const postData={...this.ticket, ...userData};

    const userId = this.userService.getUser()?.id || null;

    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }

    this.ticketService.sendTourData(postObj).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Заказ оформлен',
      });
    });
  }

  selectDate(ev:Event): void{

  }


}
