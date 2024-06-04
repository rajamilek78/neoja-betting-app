import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonService } from '@app/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
})
export class OperatorComponent implements OnInit {
  teamPlayer: { name: string }[] = [];
  blueTeamPlayers: { name: string }[] = [];
  redTeamplayers: { name: string }[] = [];
  blueTeamBatter: { name: string }[] = [];
  redTeamBatter: { name: string }[] = [];
  playersForm: FormGroup;
  timeLeft!: number;
  interval: any;
  isDragDropDisabled: boolean = false;
  selectedTeam!: string;

  constructor(private fb: FormBuilder, private CommonService: CommonService ) {
    this.playersForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getGameRules();
  }

  getGameRules(){
    this.CommonService.getGameRules().subscribe(
      (res) => {
        this.timeLeft = res.GAME_TIMER;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  

  get players(): FormArray {
    return this.playersForm.get('players') as FormArray;
  }

  addPlayer() {
    this.players.push(
      this.fb.group({
        name: ['', Validators.required],
        //isEditable: [true]
      })
    );
  }

  savePlayerName(index: number) {
    const player = this.players.at(index);
    if (player.get('name')!.valid) {
      const playerName = player.get('name')!.value;
      const playerObj = { name: playerName };
      if (!this.teamPlayer.some((p) => p.name === playerName)) {
        this.teamPlayer.push(playerObj);
      }
      //player.get('isEditable')!.setValue(false);
      player.get('name')!.reset();

      this.CommonService.addPlayers({ name: playerName }).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    
    }
  }


  editPlayer(index: number) {
    const player = this.players.at(index);
    //player.get('isEditable')!.setValue(true);
  }

  deletePlayer(index: number) {
    this.players.removeAt(index);
  }

  drop(event: CdkDragDrop<{ name: string }[]>) {
    if (this.isDragDropDisabled) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.blueTeamPlayers)
    console.log(this.redTeamplayers)
  }

  startTimer(){
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
       this.submitBets();
      }
    }, 1000);
  }

  startNewGame(){
    this.blueTeamPlayers = [];
    this.redTeamplayers = [];
    this.blueTeamBatter = [];
    this.redTeamBatter = [];
  }

  submitBets() {
    this.isDragDropDisabled = true;
  }

  selectTeam(team: string) {
    this.selectedTeam = team;
    console.log(this.selectedTeam)
  }

  submitGame() {

    const gameData = {
      team_blue: {
        players: this.blueTeamPlayers.map(player => ({ name: player.name })),
        bettors: this.blueTeamBatter.map(bettor => ({ name: bettor.name })),
        isWin: false
      },
      team_red: {
        players: this.redTeamplayers.map(player => ({ name: player.name })),
        bettors: this.redTeamBatter.map(bettor => ({ name: bettor.name })),
        isWin: false
      }
    };

    if (this.selectedTeam === 'blue') {
      gameData.team_blue.isWin = true;
      gameData.team_red.isWin = false;
    } else if (this.selectedTeam === 'red') {
      gameData.team_blue.isWin = false;
      gameData.team_red.isWin = true;
    }

    console.log(gameData)

    this.CommonService.addGame(gameData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  
}
