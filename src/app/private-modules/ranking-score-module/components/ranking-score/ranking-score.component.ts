import { Component } from '@angular/core';
import { CommonService } from '@app/core';
import { HighscoreService } from '@app/core/services/highscore.service';
import { Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendEmailDialogueComponent } from '@app/core';

@Component({
  selector: 'app-ranking-score',
  templateUrl: './ranking-score.component.html',
  styleUrl: './ranking-score.component.scss',
})
export class RankingScoreComponent {
  players: any[] = [];
  fourthTo15Players: any[] = [];
  constructor(private CommonService: CommonService,  private highscoreService: HighscoreService, private renderer: Renderer2, private dialog: MatDialog) {
  
    this.renderer.setStyle(
      document.body,
      'background',
      'url("../../../../../assets/images/ranking-background-img.png")'
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    this.getAllplayer();
    this.getSocetData();
  };

  getAllplayer(){
    this.CommonService.getTopPlayers().subscribe(
      (res) => {
        this.players = res.slice(0, 15);
        this.fourthTo15Players = res.slice(3, 15);
        console.log(this.fourthTo15Players)
        //console.log(this.players)
      },
      (err) => {
        console.error(err);
      }
    );
  
  }

  getSocetData = () => {
    this.highscoreService.listenForScoreUpdates().subscribe((newData) => {
      this.players = newData.slice(0, 15);
      this.fourthTo15Players = newData.slice(3, 15);
      console.log(this.players)
      console.log('Event emitted by server', this.players);
    });
  };
  openSendEmailDialogue() {
    const dialogueRef = this.dialog.open(SendEmailDialogueComponent, {
      width: '450px',
    });
  }
}
