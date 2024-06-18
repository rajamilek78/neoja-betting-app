import { Component, OnInit } from '@angular/core';
import { CodeDialogueComponent } from '../code-dialogue/code-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private dialogue: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  openCodeDialogue(card: string): void {
    const dialogueRef = this.dialogue.open(CodeDialogueComponent, {
      width: '450px',
      data: { card: card },
    });
  }
}
