import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material';
import { OperatorRoutingModule } from './operator-routing.module';
import { operatorModuleComponents } from './components/components.export';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...operatorModuleComponents],
  imports: [CommonModule, OperatorRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class OperatorModule {}
