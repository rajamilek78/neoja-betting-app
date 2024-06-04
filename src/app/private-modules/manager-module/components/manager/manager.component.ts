import { Component } from '@angular/core';
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
  constructor(private dialog: MatDialog, private router: Router) {}
  openSendEmailDialogue() {
    const dialogueRef = this.dialog.open(SendEmailDialogueComponent, {
      width: '450px',
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
}
