import { Component } from '@angular/core';
import { CommonService, SharedService, SnackBarService } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeScoreDialogueComponent } from '../change-score-dialogue/change-score-dialogue.component';
import { ChangeTimeDialogueComponent } from '../change-time-dialogue/change-time-dialogue.component';
import { SendEmailDialogueComponent } from '../../../../core/components/send-email-dialogue/send-email-dialogue.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  players: any[] = [];
  isLoading = true;
  private loaderSubscriber$!: Subscription;
  constructor(
    private CommonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackBarService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    console.log(this.isLoading)
    this.subscribeIsLoading();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.initialize();
  }

  initialize = () => {
    this.getAllplayer();
  };

  getAllplayer() {
    this.CommonService.getAllPlayer().subscribe(
      (res) => {
        console.log(this.isLoading)
        console.log(res.length)
        this.players = res;
      },
      (err) => {
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.error(err);
      }
    );
  }

  resetDatabase() {
    this.CommonService.resetDatabase().subscribe(
      (res) => {
        localStorage.clear();
        this.getAllplayer();
        console.log(res);
      },
      (err) => {
        this.snackbarService.setSnackBarMessage(err.error.message);
        console.error(err);
      }
    );
  }

  
  ngOnDestroy() {
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe();
    }
  }

  subscribeIsLoading() {
    this.loaderSubscriber$ = this.sharedService
      .getLoader()
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        console.log(isLoading)
      });
  }

  openSendEmailDialogue() {
    const dialogueRef = this.dialog.open(SendEmailDialogueComponent, {
      width: '450px',
      data: { players: this.players },
    });
  }

  openChangeTimeDialogue() {
    const dialogueRef = this.dialog.open(ChangeTimeDialogueComponent, {
      width: '450px',
    });
  }

  openChangeScoreDialogue() {
    const dialogueRef = this.dialog.open(ChangeScoreDialogueComponent, {
      width: '450px',
    });
  }

  onBackToMenu = () => {
    this.router.navigate(['']);
  };
}
