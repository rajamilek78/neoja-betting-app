import { Component } from '@angular/core';
import { CommonService } from '@app/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  players: any[] = [];
  constructor(private CommonService: CommonService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    this.getAllplayer()
  };

  getAllplayer(){
    this.CommonService.getAllPlayer().subscribe(
      (res) => {
        this.players = res
      },
      (err) => {
        console.error(err);
      }
    );
  
  }
}
