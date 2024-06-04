import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ranking-score',
  templateUrl: './ranking-score.component.html',
  styleUrl: './ranking-score.component.scss',
})
export class RankingScoreComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(
      document.body,
      'background',
      'url("../../../../../assets/images/ranking-background-img.png")'
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }
}
