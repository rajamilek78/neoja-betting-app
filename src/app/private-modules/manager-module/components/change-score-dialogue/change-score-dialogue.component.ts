import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/core';

@Component({
  selector: 'app-change-score-dialogue',
  templateUrl: './change-score-dialogue.component.html',
  styleUrl: './change-score-dialogue.component.scss',
})
export class ChangeScoreDialogueComponent {
  GPW!: number;
  GPL!: number;
  GBW!: number;
  GBL!: number;
  constructor(private dialogue: MatDialogRef<ChangeScoreDialogueComponent>, private CommonService: CommonService) {}

  close() {
    this.dialogue.close();
  }

  save() {
    const params = {
      GPW: this.GPW,
      GPL: this.GPL,
      GBW: this.GBW,
      GBL: this.GBL,
    };

    this.CommonService.upsertGameRule(params).subscribe(
      (response) => {
        console.log(response);
        this.dialogue.close();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
