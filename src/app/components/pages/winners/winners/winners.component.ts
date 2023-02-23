import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IParticipant } from 'src/app/models/IParticipant';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-rifame-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit, OnDestroy {

  winners: IParticipant[] = [];
  participantsAreLoaded: boolean = true;
  displayedColumns = ['id', 'name', 'actions'];
  subscription: Subscription;

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {
  }

  ngOnDestroy(): void {
    if (this.subscription != null && this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this._storageService.getWinners$().subscribe(response => {
      this.winners = response
    });

    this._storageService.loadWinnersFromExistingStorage();

  }


}
