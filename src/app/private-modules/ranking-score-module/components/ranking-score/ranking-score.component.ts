import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailDialogueComponent } from '@app/core';

@Component({
  selector: 'app-ranking-score',
  templateUrl: './ranking-score.component.html',
  styleUrl: './ranking-score.component.scss',
})
export class RankingScoreComponent {
  constructor(private renderer: Renderer2, private dialog: MatDialog) {
    this.renderer.setStyle(
      document.body,
      'background',
      'url("../../../../../assets/images/ranking-background-img.png")'
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }

  openSendEmailDialogue() {
    const dialogueRef = this.dialog.open(SendEmailDialogueComponent, {
      width: '450px',
    });
  }
}
