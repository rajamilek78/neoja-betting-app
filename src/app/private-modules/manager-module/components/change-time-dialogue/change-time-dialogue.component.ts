import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-time-dialogue',
  templateUrl: './change-time-dialogue.component.html',
  styleUrl: './change-time-dialogue.component.scss',
})
export class ChangeTimeDialogueComponent {
  constructor(private dialogue: MatDialogRef<ChangeTimeDialogueComponent>) {}

  close() {
    this.dialogue.close();
  }
}
