import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets.component';
import {OrderComponent} from "../order/order/order.component";



const routes: Routes = [
  { path: '',
  component: TicketsComponent,
  children: [
    {
    path: 'tickets-list',
    component: TicketListComponent
    },
    {
      path: 'ticket/:id',
      loadChildren:() => import('../ticket-info/ticket-info.module').then(m=>m.TicketInfoModule)
    },
    {
      path: 'order',
      component: OrderComponent,
    },
    { path: 'settings',
      loadChildren: ()  => import('../settings/settings.module').then(m => m.SettingsModule)
    },

  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
