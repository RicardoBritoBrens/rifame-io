import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IParticipants } from 'src/app/models/IParticipants';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rifame-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.css']
})
export class RafflesComponent implements OnInit, OnDestroy {

  subscriptionParticipants: Subscription

  winners: IParticipants[] = [];
  participants: IParticipants[] = [];

  testDataSourceParticipants = new MatTableDataSource<IParticipants>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IParticipants>();

  constructor(
    private _route: Router,
    private _notificationService: NotificationService,
    private _storageService: LocalStorageParticipantsService,) {
  }
  ngOnDestroy(): void {
    if (this.subscriptionParticipants != undefined && this.subscriptionParticipants != null) {
      this.subscriptionParticipants.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this._storageService.getCurrentQuantityOfParticipants() == 0) {
      this._notificationService.warning("There are not participants added")
      this._route.navigate(['rifame/participants']);
      return;
    } else {
      this.subscriptionParticipants = this._storageService.getParticipants$().subscribe(
        (participants) => {
          this.participants = participants;
        })
    }

  }

}
