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
  playerForm: FormGroup;
  timeLeft!: number;
  interval: any;
  isDragDropDisabled: boolean = false;
  selectedTeam!: string;
  isEditable: boolean[] = [];

  constructor(private fb: FormBuilder, private CommonService: CommonService) {
    this.playerForm = this.fb.group({
      newPlayer: [''],
    });
  }

  ngOnInit(): void {
    this.getTimmer();
  }
  getTimmer() {
    this.CommonService.getGameRules().subscribe(
      (res) => {
        this.timeLeft = res.GAME_TIMER
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addPlayer() {
    if (this.playerForm) {
      const newPlayer = this.playerForm?.get('newPlayer')?.value;
      if (newPlayer && newPlayer !== '') {
        const payload = { name : newPlayer };
        this.CommonService.addPlayers(payload).subscribe({
          next : (res:any)=>{
            console.log(res);
            this.teamPlayer.push(payload);
            },
            error : (err:any)=>{
              console.log(err);
             }
        })
        this.playerForm.reset();
      } else {
        console.log('Player name cannot be empty');
      }
    }
  }
  
  editPlayer(index: number, event: Event,oldName? : string) {
    const target = event.target as HTMLInputElement;
    const newName = target.value;
  
    // Check if newName is not empty
    if (newName && newName !== '') {
      // Update the name of the player at the given index
      const payload = { name : newName}
      if(oldName){
        this.CommonService.editPlayer(oldName,payload).subscribe({
          next : (res:any)=>{
            console.log(res);
            this.teamPlayer[index].name = newName;
            
          },
          error : (err :any)=>{
            console.log(err);
            
          }
        })
      }
      console.log(this.teamPlayer);
      
    } else {
      // Handle the case when the input field is empty
      console.log('Player name cannot be empty');
    }
  }
  
  deletePlayer(index: number, name: string) {
    this.CommonService.deletePlayer(name).subscribe({
      next: (res: any) => {
        console.log(res);
        // Remove the player from the teamPlayer array
        this.teamPlayer.splice(index, 1);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
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
    console.log(this.blueTeamPlayers);
    console.log(this.redTeamplayers);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.submitBets();
      }
    }, 1000);
  }

  startNewGame() {
    this.blueTeamPlayers = [];
    this.redTeamplayers = [];
    this.blueTeamBatter = [];
    this.redTeamBatter = [];
  }

  submitBets() {
    this.timeLeft
    this.isDragDropDisabled = true;
  }

  selectTeam(team: string) {
    this.selectedTeam = team;
    console.log(this.selectedTeam);
  }

  submitGame() {
    const gameData = {
      team_blue: {
        players: this.blueTeamPlayers.map((player) => ({ name: player.name })),
        bettors: this.blueTeamBatter.map((bettor) => ({ name: bettor.name })),
        isWin: false,
      },
      team_red: {
        players: this.redTeamplayers.map((player) => ({ name: player.name })),
        bettors: this.redTeamBatter.map((bettor) => ({ name: bettor.name })),
        isWin: false,
      },
    };

    if (this.selectedTeam === 'blue') {
      gameData.team_blue.isWin = true;
      gameData.team_red.isWin = false;
    } else if (this.selectedTeam === 'red') {
      gameData.team_blue.isWin = false;
      gameData.team_red.isWin = true;
    }

    console.log(gameData);

    this.CommonService.addGame(gameData).subscribe(
      (res) => {
        console.log(res);
        //this.startNewGame(); // Optionally reset game state after successful submission
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
