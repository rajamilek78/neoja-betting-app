import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/core';

@Component({
  selector: 'app-change-time-dialogue',
  templateUrl: './change-time-dialogue.component.html',
  styleUrl: './change-time-dialogue.component.scss',
})
export class ChangeTimeDialogueComponent {
  gameTimer!: number;
  constructor(private dialogue: MatDialogRef<ChangeTimeDialogueComponent>, private CommonService: CommonService) {}

  close() {
    this.dialogue.close();
  }


  save() {
    const params = {
      GAME_TIMER: this.gameTimer
    };

    this.CommonService.upsertGameRule(params).subscribe(
      (res) => {
        this.close();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
