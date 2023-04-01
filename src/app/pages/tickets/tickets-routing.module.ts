import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets.component';



const routes: Routes = [
  { path: '',
  component: TicketsComponent,
  children: [
    {
    path: 'tickets-list',
    component: TicketListComponent
    },
    {
      path:'ticket',
      loadChildren: () => import ('src/app/pages/ticket-info/ticket-info.module').then(m=>m.TicketInfoModule)
    },


  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
