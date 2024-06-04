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

@NgModule({
  declarations: [...managerModuleComponents],
  imports: [CommonModule, ManagerRoutingModule, CdkDropList, CdkDrag, FormsModule],
})
export class ManagerModule {}
