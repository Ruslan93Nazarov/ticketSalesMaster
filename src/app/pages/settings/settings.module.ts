import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './changePassword/change-password/change-password.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './tour-loader/tour-loader.component';





@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent,
    TourLoaderComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingsRoutingModule,
        TabViewModule,
        InputTextModule,
        ToastModule,
        FormsModule,
        TableModule,
    ]
})
export class SettingsModule { }
