import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IParticipants } from 'src/app/models/IParticipants';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rifame-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.css']
})
export class RafflesComponent implements OnInit {

  winners: IParticipants[] = [];

  constructor(
    private _route: Router,
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService,
    private _storageService: LocalStorageParticipantsService,) {
  }

  ngOnInit(): void {


    if (this._storageService.getQuantityOfParticipants() == 0) {
      this._notificationService.warning("There are not participants added")
      this._route.navigate(['rifame/participants'])
    }
  }

}
