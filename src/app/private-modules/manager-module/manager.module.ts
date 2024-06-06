import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { managerModuleComponents } from './components/components.export';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';

@NgModule({
  declarations: [...managerModuleComponents],
  imports: [CommonModule, ManagerRoutingModule, CdkDropList, CdkDrag, FormsModule, MaterialModule],
})
export class ManagerModule {}
