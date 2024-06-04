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

@NgModule({
  declarations: [...managerModuleComponents],
  imports: [CommonModule, ManagerRoutingModule, CdkDropList, CdkDrag],
})
export class ManagerModule {}
