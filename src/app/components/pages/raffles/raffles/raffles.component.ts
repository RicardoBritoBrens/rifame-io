import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChildComponent } from 'src/app/child/child.component';
import { environment } from 'src/environments/environment';
import { IParticipant } from 'src/app/models/IParticipant';

@Component({
  selector: 'app-rifame-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.css']
})
export class RafflesComponent implements OnInit, OnDestroy {

  canIStartRaffle: boolean;
  dataArray: IParticipant[];
  subscriptionParticipants: Subscription
  winners: IParticipant[] = [];
  participants: IParticipant[] = [];
  seed: [];
  items: any[];
  testDataSourceParticipants = new MatTableDataSource<IParticipant>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IParticipant>();
  numberOfParticipants: any;
  listOfParticipantsWithColors: { text: String, fillStyle: String, id: number, textFontSize: number }[];
  idToLandOn: any;

  constructor(
    private _route: Router,
    private _notificationService: NotificationService,
    private _storageService: LocalStorageParticipantsService,) {
    this.canIStartRaffle = false;
    this._storageService.getCurrentParticipants();
  }

  @ViewChild(ChildComponent, { static: false }) childRef: ChildComponent;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  destroyChild() {
    if (this.childRef) {
      this.childRef.ngOnDestroy();
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionParticipants != undefined && this.subscriptionParticipants != null) {
      this.subscriptionParticipants.unsubscribe();
    }
    this.onDestroy.next();
  }

  ngOnInit(): void {
    debugger;
    this._storageService.getParticipants$().subscribe(response => {
      debugger;

      this.participants = response;
      this.listOfParticipantsWithColors = [];
      this.numberOfParticipants = this.participants.length;
      this.idToLandOn = this.getRandomIntByData(this.participants);
      this.generateRandomColorForEachParticipants(this.participants);
      if (this.participants.length > 0) {
        this.canIStartRaffle = true;
      }
    });

    this.participants = this._storageService.getCurrentParticipants();
    this.listOfParticipantsWithColors = [];
    this.numberOfParticipants = this.participants.length;
    this.idToLandOn = this.getRandomIntByData(this.participants);
    this.generateRandomColorForEachParticipants(this.participants);
    if (this.participants.length > 0) {
      this.canIStartRaffle = true;
    }
  }

  resetData() {
    this.dataArray = [];
  }

  processData() {
    // Event Emmiter to trigger processing function in child component.
  }

  startRaffle() {
    this.canIStartRaffle = true;
  }

  generateRandomColorForEachParticipants(listOfParticipants: IParticipant[]) {
    listOfParticipants.forEach((element) => {
      this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor(), id: element.id, textFontSize: environment.WHEEL_TEXT_FONT_SIZE })
    });
  }

  getRandomIntByData(data: IParticipant[]): any {
    return data[Math.floor(Math.random() * this.participants.length)].id;
  }

  getRandomColor(): string {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  addItem(removedParticipant: IParticipant) {

    this.canIStartRaffle = false;
    console.log(removedParticipant);
    this.childRef.ngOnDestroy();
    setTimeout(function () {
      // Code to run after the pause
      console.log("This is really slow!");
    }, 3000);

    this.canIStartRaffle = true;
  }
}
