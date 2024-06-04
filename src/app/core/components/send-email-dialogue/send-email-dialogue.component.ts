import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-email-dialogue',
  templateUrl: './send-email-dialogue.component.html',
  styleUrl: './send-email-dialogue.component.scss',
})
export class SendEmailDialogueComponent {
  constructor(private dialogue: MatDialogRef<SendEmailDialogueComponent>) {}

  close() {
    this.dialogue.close();
  }
}
