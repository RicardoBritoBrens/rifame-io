import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { IParticipant } from 'src/app/models/IParticipant';
import { RouletteComponent } from './roulette/roulette.component';


@Component({
  selector: 'app-rifame-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.css']
})
export class RafflesComponent implements OnInit, OnDestroy {

  canIStartRaffle: boolean;
  dataArray: IParticipant[];
  subscriptionParticipants: Subscription
  participants: IParticipant[] = [];
  seed: [];
  items: any[];
  displayedColumns: string[] = [];
  testDataSourceParticipants = new MatTableDataSource<IParticipant>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IParticipant>();
  numberOfParticipants: any;
  listOfParticipantsWithColors: { text: String, fillStyle: String, id: number, textFontSize: number }[];
  idToLandOn: any;

  winners: IParticipant[] = [
    {
      id: 1,
      name: "ARDRA"
    },
    {
      id: 2,
      name: "AUGUSTINA"
    },
    {
      id: 3,
      name: "BAMBY"
    },
    {
      id: 4,
      name: "BERYLE"
    },
    {
      id: 5,
      name: "CARLY"
    },
    {
      id: 6,
      name: "CATHYLEEN"
    },
    {
      id: 7,
      name: "CHELSAE"
    },
    {
      id: 8,
      name: "CLAYBORNE"
    },
    {
      id: 9,
      name: "DORE"
    },
    {
      id: 10,
      name: "DOROTHY"
    },
    {
      id: 11,
      name: "LEOLA"
    },
    {
      id: 12,
      name: "LINOEL"
    },
    {
      id: 13,
      name: "LORITA"
    },
    {
      id: 14,
      name: "NORAH"
    },
    {
      id: 15,
      name: "SILVIA"
    }
  ]

  constructor(
    private _route: Router,
    private _notificationService: NotificationService,
    private _storageService: LocalStorageParticipantsService,) {
    this.canIStartRaffle = false;
    this._storageService.getCurrentParticipants();
  }

  @ViewChild(RouletteComponent, { static: false }) childRef: RouletteComponent;
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

    this._storageService.getParticipants$().subscribe(response => {
      if (response != null && response.length > 0) {
        this.participants = response;
        this.listOfParticipantsWithColors = [];
        this.numberOfParticipants = this.participants.length;
        this.idToLandOn = this.getRandomIntByData(this.participants);
        this.generateRandomColorForEachParticipants(this.participants);
        if (this.participants.length > 0) {
          this.canIStartRaffle = true;
        }
      }
    });

    this.participants = this._storageService.getCurrentParticipants();

    if (this.participants != null && this.participants.length > 0) {

      this.listOfParticipantsWithColors = [];
      this.numberOfParticipants = this.participants.length;
      this.idToLandOn = this.getRandomIntByData(this.participants);
      this.generateRandomColorForEachParticipants(this.participants);
      if (this.participants.length > 0) {
        this.canIStartRaffle = true;
      }
    }

    this.displayedColumns = ['id', 'name'];

  }

  resetData() {
    this.dataArray = [];
  }

  processData() {
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
      console.log("This is really slow!");
    }, 3000);

    this.canIStartRaffle = true;
  }


}
