import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-score-dialogue',
  templateUrl: './change-score-dialogue.component.html',
  styleUrl: './change-score-dialogue.component.scss',
})
export class ChangeScoreDialogueComponent {
  constructor(private dialogue: MatDialogRef<ChangeScoreDialogueComponent>) {}

  close() {
    this.dialogue.close();
  }
}
