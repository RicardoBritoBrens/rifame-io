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
export class RouletteComponent implements OnInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
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

  ngOnInit() {
    // TODO: CREATE PROMISE TO FIRST INITIALIZE THE LIST LIST OF PARTICIPANTS AND THEN GENERATE RANDOM ID, THE ERROR IS PRODUCE BECAUSE
    // THE LIST IS EMPTY
    this.listOfParticipantsWithColors = []
    this.listOfParticipants = this._participantService.getCurrentParticipants();
    this.generateRandomColorForEachParticipants(this.listOfParticipants);
    this.numberOfParticipants = this.listOfParticipants.length;

    this.idToLandOn = this.getRandomInt();//this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16'
    }))
  }
  reset() {
    this.wheel.reset()
  }
  before() {
    this._audioService.playSound('roulette');
  }

  async spin(prize) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  after() {
    this._notificationService.success(`El ganador ha sido ${this.listOfParticipants[this.idToLandOn].name}`)
    this._audioService.playSound('success');
  }

  private getRandomColor(): string {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generateRandomColorForEachParticipants(listOfParticipants: IParticipants[]) {
    listOfParticipants.forEach((element) => {
      this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor() })
    });
  }

  private getRandomInt(): any {
    debugger;
    return this.listOfParticipants[Math.floor(Math.random() * this.seed.length)];
  }

}
