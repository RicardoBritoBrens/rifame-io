import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { IParticipants } from 'src/app/models/IParticipants';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  idToLandOn: any;
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

  numberOfParticipants: number = 0;
  listOfParticipants: IParticipants[] = [];
  listOfParticipantsWithColors: { text: String, fillStyle: String }[];

  constructor(
    private _audioService: AudioService,
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.idToLandOn = 3;
    this.listOfParticipantsWithColors = []
    this.listOfParticipants = this._participantService.getCurrentParticipants();
    this.generateRandomColorForEachParticipants(this.listOfParticipants);
    this.numberOfParticipants = this.listOfParticipants.length;
  }

  generateRandomColorForEachParticipants(listOfParticipants: IParticipants[]) {
    listOfParticipants.forEach((element) => {
      this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor() })
    });
  }

  async spin() {
    debugger;
    this.idToLandOn = this.getRandomInt();
    await new Promise(resolve => setTimeout(resolve, 8));
    this.wheel.spin();
  }

  before() {
    this._audioService.playSound('roulette');
  }

  after() {
    this._notificationService.success(`El ganador ha sido ${this.listOfParticipants[this.idToLandOn].name}`)
    this._audioService.playSound('success');
  }

  ngAfterViewInit() {
  }

  reset() {
    this.wheel.reset();
  }

  getRandomInt() {
    return Math.floor(Math.random() * this.listOfParticipants.length);
  }

  private getRandomColor(): string {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
