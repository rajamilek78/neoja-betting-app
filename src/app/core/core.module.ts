import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIManager, CommonService, SharedService, SharedUserService } from './services';
import { UtilityModule } from '../utility/utility.module';
import { HttpInterceptors } from "./http-interceptors/index-Interceptor";
import { coreComponents } from './components/component-export';
import { SnackBarService } from './services/snackbar.service';
import { utilityDirectives } from '@app/utility/directives/directive-export';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [...coreComponents],
  providers : [
    HttpInterceptors,
    CommonService,
    SharedService,
    SharedUserService,
    SnackBarService,
    APIManager,
  ],
  imports: [
    CommonModule,
    UtilityModule,
    FormsModule
  ],
  exports: [...coreComponents,UtilityModule]
})
export class CoreModule { }
