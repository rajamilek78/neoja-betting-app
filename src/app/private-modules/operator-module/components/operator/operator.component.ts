import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.scss',
})
export class OperatorComponent {
  teamPlayer: { name: string }[] = [];
  blueTeamPlayers: { name: string }[] = [];
  redTeamplayers: { name: string }[] = [];
  blueTeamBatter: { name: string }[] = [];
  redTeamBatter: { name: string }[] = [];
  playersForm: FormGroup;
  timeLeft: number = 120;
  interval: any;

  constructor(private fb: FormBuilder) {
    this.playersForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  get players(): FormArray {
    return this.playersForm.get('players') as FormArray;
  }

  addPlayer() {
    this.players.push(
      this.fb.group({
        name: ['', Validators.required],
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
      // player.get('editable')!.setValue(false);
      player.get('name')!.reset();
    }
    console.log(player);
    console.log(this.players.value);
    console.log(this.teamPlayer);
  }

  drop(event: CdkDragDrop<{ name: string }[]>) {
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
      }
    }, 1000);
  }
  
}
