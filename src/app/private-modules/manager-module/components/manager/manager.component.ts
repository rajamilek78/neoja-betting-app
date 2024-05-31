import {Component} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  // constructor(
  // ) {}

  // ngOnInit(): void {
  //   this.initialize();
  // }

  // initialize = () => {
  // };

  players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  blueTeam = ['Player 5', 'Player 6'];
  redTeam = ['Player 7', 'Player 8'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
