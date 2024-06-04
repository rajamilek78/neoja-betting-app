import { Component } from '@angular/core';
import { CommonService } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeScoreDialogueComponent } from '../change-score-dialogue/change-score-dialogue.component';
import { ChangeTimeDialogueComponent } from '../change-time-dialogue/change-time-dialogue.component';
import { SendEmailDialogueComponent } from '../../../../core/components/send-email-dialogue/send-email-dialogue.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  players: any[] = [];
  constructor(private CommonService: CommonService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    this.getAllplayer()
  };

  getAllplayer(){
    this.CommonService.getAllPlayer().subscribe(
      (res) => {
        this.players = res
      },
      (err) => {
        console.error(err);
      }
    );
  
  }

  
  resetDatabase(){
    this.CommonService.resetDatabase().subscribe(
      (res) => {
        this.getAllplayer();
        console.log(res)
      },
      (err) => {
        console.error(err);
      }
    );
  
  }

  openSendEmailDialogue() {
    const dialogueRef = this.dialog.open(SendEmailDialogueComponent, {
      width: '450px',
      data: { players: this.players }
    });
  }

  openChangeTimeDialogue() {
    const dialogueRef = this.dialog.open(ChangeTimeDialogueComponent, {
      width: '450px',
    });
  }

  openChangeScoreDialogue() {
    const dialogueRef = this.dialog.open(ChangeScoreDialogueComponent, {
      width: '450px',
    });
  }

  onBackToMenu = () => {
    this.router.navigate(['']);
  };

}
