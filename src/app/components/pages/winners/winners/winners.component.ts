import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { IParticipants } from '../../../../models/IParticipants';

@Component({
  selector: 'app-rifame-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

  winners: IParticipants[] = null;
  participantsAreLoaded: boolean = true;
  constructor(
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this._participantService.getWinnersMock().subscribe(data => {
      this.winners = data
    });
  }

  public show(): void {
    this.participantsAreLoaded = true;
  }

  public hide(): void {
    this.participantsAreLoaded = false;
  }

}
