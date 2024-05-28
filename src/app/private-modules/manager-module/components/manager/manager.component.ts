import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HighscoreService } from '@app/core/services/highscore.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  constructor(
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
  };
}
