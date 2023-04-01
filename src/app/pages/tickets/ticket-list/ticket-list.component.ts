import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { ITour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) { }


  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
          this.tickets = data;
          this.ticketStorage.setStorage(data);
          this.ticketsCopy = [...this.tickets];
      })


  }
  ngAfterViewInit(): void{
    this.tourWrap
  }



  goToTicketInfoPage(item:ITour){

    this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
  }

    directiveRenderComplete(ev:boolean){
      this.blockDirective.initStyle(0)
    }


    findTours(ev:Event): void{
      const searchValue = (<HTMLInputElement>ev.target).value.toLowerCase();

      if(searchValue){
        this.tickets = this.ticketsCopy.filter((el)=>el.name.toLowerCase().includes(searchValue));
      } else {
        this.tickets = [...this.ticketsCopy];
      }
    }


}
