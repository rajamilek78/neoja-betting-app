import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonService, SnackBarService } from '@app/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
})
export class OperatorComponent implements OnInit {
  @ViewChild('playerInput') playerInput!: ElementRef;
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
  isBetSubmited: boolean = false;
  isEditable: boolean[] = [];
  draggable: string = '';
  isGamePlayerSubmited: boolean = false;
  isGameSubmited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private CommonService: CommonService,
    private snackbarService: SnackBarService,
    private router: Router
  ) {
    this.playerForm = this.fb.group({
      newPlayer: [''],
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.getTimmer();
  }
  getTimmer() {
    this.CommonService.getGameRules().subscribe(
      (res) => {
        this.timeLeft = res.GAME_TIMER;
      },
      (err) => {
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.error(err);
      }
    );
  }
  editAndFocus(i: number) {
    this.isEditable[i] = true;
    setTimeout(() => {
      this.playerInput.nativeElement.focus();
    }, 0);
  }

  addPlayer() {
    if (this.playerForm) {
      const newPlayer = this.playerForm?.get('newPlayer')?.value;
      if (newPlayer && newPlayer !== '') {
        const payload = { name: newPlayer };
        this.CommonService.addPlayers(payload).subscribe({
          next: (res: any) => {
            console.log(res);
            this.teamPlayer.push(payload);
            this.savePlayersToLocalStorage();
            setTimeout(() => {
              const playerList = document.querySelector('.operator__scroll');
              if (playerList) {
                const lastPlayer = playerList.lastElementChild;

                if (lastPlayer) {
                  lastPlayer.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }, 0);
          },
          error: (err: any) => {
            this.snackbarService.setSnackBarMessage(err.error.message);
            console.log(err);
          },
        });
        this.playerForm.reset();
      } else {
        console.log('Player name cannot be empty');
      }
    }
  }

  editPlayer(index: number, event: Event, oldName?: string) {
    const target = event.target as HTMLInputElement;
    const newName = target.value;

    // Check if newName is not empty
    if (newName && newName !== '') {
      // Update the name of the player at the given index
      const payload = { currentName: oldName, newName: newName };
      if (oldName) {
        this.CommonService.editPlayer(payload).subscribe({
          next: (res: any) => {
            console.log(res);
            this.teamPlayer[index].name = newName;
            this.savePlayersToLocalStorage();
          },
          error: (err: any) => {
            this.snackbarService.setSnackBarMessage(err.error.message);
            console.log(err);
          },
        });
      }
      console.log(this.teamPlayer);
    } else {
      // Handle the case when the input field is empty
      console.log('Player name cannot be empty');
    }
  }

  savePlayersToLocalStorage() {
    localStorage.setItem('teamPlayers', JSON.stringify(this.teamPlayer));
  }

  loadPlayersFromLocalStorage() {
    const storedPlayers = localStorage.getItem('teamPlayers');
    if (storedPlayers) {
      this.teamPlayer = JSON.parse(storedPlayers);
    }
  }

  deletePlayer(index: number, name: string) {
    this.CommonService.deletePlayer(name).subscribe({
      next: (res: any) => {
        console.log(res);
        // Remove the player from the teamPlayer array
        this.teamPlayer.splice(index, 1);
        this.savePlayersToLocalStorage();
      },
      error: (err: any) => {
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.log(err);
      },
    });
  }

  // drop(event: CdkDragDrop<{ name: string }[]>) {
  //   if (this.isDragDropDisabled) {
  //     return;
  //   }

  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  //   console.log(this.blueTeamPlayers);
  //   console.log(this.redTeamplayers);
  // }
  drop(event: CdkDragDrop<{ name: string }[]>) {
    if (this.isDragDropDisabled) {
      return;
    }

    // Prevent adding more than 4 players
    if (
      event.container.id === 'blueTeamList' &&
      this.blueTeamPlayers.length >= 4
    ) {
      console.log('Cannot add more than 4 players to the Blue Team');
      return;
    }

    if (event.container.id === 'blueTeamList' && this.isGamePlayerSubmited) {
      console.log('can not drag player in blueteam');
      return;
    }

    if (event.container.id === 'redTeamList' && this.isGamePlayerSubmited) {
      console.log('can not drag player in redteam');
      return;
    }

    if (event.container.id === 'blueTeamBatter' && !this.isGamePlayerSubmited) {
      console.log('can not drag player in blueteambetter');
      return;
    }

    if (event.container.id === 'redTeamBatter' && !this.isGamePlayerSubmited) {
      console.log('can not drag player in redteambetter');
      return;
    }
    // Prevent adding more than 4 players to red team
    if (
      event.container.id === 'redTeamList' &&
      this.redTeamplayers.length >= 4
    ) {
      console.log('Cannot add more than 4 players to the Red Team');
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
    this.isGamePlayerSubmited = true;
    console.log('method called');

    this.draggable = 'teamBlueAndRedPlayers';
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
    this.selectedTeam = '';
    this.loadPlayersFromLocalStorage();
    this.isGamePlayerSubmited = false;
    clearInterval(this.interval);
    this.getTimmer();
  }

  submitBets() {
    this.timeLeft = 0;
    this.isDragDropDisabled = true;
    this.isBetSubmited = true;
  }

  selectTeam(team: string) {
    console.log('method called to win');

    this.selectedTeam = team;
    console.log(this.selectedTeam);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  removePlayers() {
    this.blueTeamPlayers = [];
    this.redTeamplayers = [];
    this.blueTeamBatter = [];
    this.redTeamBatter = [];
    this.selectedTeam = '';
    this.teamPlayer = [];
    localStorage.removeItem('teamPlayers');
    // this.CommonService.resetDatabase().subscribe(
    //   (res) => {
      
    //     console.log(res);
    //   },
    //   (err) => {
    //     this.snackbarService.setSnackBarMessage(err.error.message);
    //     console.error(err);
    //   }
    // );
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
        // this.selectedTeam = "";
        this.isGameSubmited = true;
        //this.startNewGame(); // Optionally reset game state after successful submission
      },
      (err) => {
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.error(err);
      }
    );
  }
}
