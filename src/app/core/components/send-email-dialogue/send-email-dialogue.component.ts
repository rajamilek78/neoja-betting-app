import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-email-dialogue',
  templateUrl: './send-email-dialogue.component.html',
  styleUrl: './send-email-dialogue.component.scss',
})
export class SendEmailDialogueComponent {
  email: string = '';

  constructor(
    private dialogRef: MatDialogRef<SendEmailDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  sendEmail() {
    const playerData = this.data.players;
    const emailContent = this.generateEmailContent(playerData);
    const mailtoLink = `mailto:${this.email}?subject=Player Data&body=${encodeURIComponent(emailContent)}`;

    window.location.href = mailtoLink;
    this.dialogRef.close();
  }

  generateEmailContent(players: any[]): string {
    let tableContent = '<table><tr><th>Name</th><th>GPW</th><th>GPL</th><th>GBW</th><th>GBL</th><th>RANK</th></tr>';
    players.forEach(player => {
      tableContent += `<tr><td>${player.name}</td><td>${player.GPW}</td><td>${player.GPL}</td><td>${player.GBW}</td><td>${player.GBL}</td><td>${player.RANK}</td></tr>`;
    });
    tableContent += '</table>';
    return tableContent;
  }
}
