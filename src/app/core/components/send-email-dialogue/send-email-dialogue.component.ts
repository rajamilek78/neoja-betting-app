import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, SnackBarService } from '@app/core/services';

@Component({
  selector: 'app-send-email-dialogue',
  templateUrl: './send-email-dialogue.component.html',
  styleUrl: './send-email-dialogue.component.scss',
})
export class SendEmailDialogueComponent {
  email: string = '';

  constructor(
    private dialogRef: MatDialogRef<SendEmailDialogueComponent>,
    private CommonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackBarService
  ) {}

  close() {
    this.dialogRef.close();
  }

  sendEmail() {
    const playerData = this.data.players;
    const params = {
      to: this.email,
      subject: "Players list",
      html:  this.generateEmailContent(playerData)
    };

    this.CommonService.sendEmail(params).subscribe(
      (response) => {
        console.log(response);
        this.close();
      },
      (error) => {
        this.snackbarService.setSnackBarMessage(error.error.message);
        console.error(error);
      }
    );
    this.dialogRef.close();
  }

  generateEmailContent(players: any[]): string {
    let tableContent = `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Name</th>
            <th>GPW</th>
            <th>GPL</th>
            <th>GBW</th>
            <th>GBL</th>
            <th>RANK</th>
          </tr>
        </thead>
        <tbody>
    `;
    players.forEach(player => {
      tableContent += `
        <tr>
          <td>${player.name}</td>
          <td>${player.GPW}</td>
          <td>${player.GPL}</td>
          <td>${player.GBW}</td>
          <td>${player.GBL}</td>
          <td>${player.RANK}</td>
        </tr>
      `;
    });
    tableContent += `
        </tbody>
      </table>
    `;
    return tableContent;
  }
}
