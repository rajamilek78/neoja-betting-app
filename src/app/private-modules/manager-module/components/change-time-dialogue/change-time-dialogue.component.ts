import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService, SnackBarService } from '@app/core';

@Component({
  selector: 'app-change-time-dialogue',
  templateUrl: './change-time-dialogue.component.html',
  styleUrl: './change-time-dialogue.component.scss',
})
export class ChangeTimeDialogueComponent implements OnInit {
  gameTimer!: number;
  constructor(private dialogue: MatDialogRef<ChangeTimeDialogueComponent>, private CommonService: CommonService, private snackbarService: SnackBarService) {}

  ngOnInit(): void {
    this.getTimmer();
  }

  
    getTimmer() {
      this.CommonService.getGameRules().subscribe(
        (res) => {
          this.gameTimer = res.GAME_TIMER
        },
        (err) => {
          this.snackbarService.setSnackBarMessage(err.error.message);
          console.error(err);
        }
      );
    }
  

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
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.error(err);
      }
    );
  }
}
