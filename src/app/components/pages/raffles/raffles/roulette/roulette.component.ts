import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { IParticipants } from 'src/app/models/IParticipants';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxWheelComponent } from 'ngx-wheel';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, AfterViewInit {

  numberOfParticipants: number = 0;
  listOfParticipants: IParticipants[] = [];
  listOfParticipantsWithColors: { text: String, fillStyle: String }[];

  textOrientation: string = 'horizontal';
  textAlignment: string = 'center';
  idToLandOn: any;

  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  constructor(
    private _audioService: AudioService,
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
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

  async spin(prize) {
    this.wheel.reset();
    this.wheel.spin();
  }

  async ngAfterViewInit() {

  }
  drawWheel() {
    // this.theWheel = new Winwheel({
    //   'canvasId': 'canvas',
    //   'numSegments': this.numberOfParticipants,
    //   'segments': this.listOfParticipantsWithColors,
    //   'lineWidth': 2,
    //   'outerRadius': 250,
    //   'innerRadius': 50,
    //   'pointerAngle': 90,
    //   'textAlignment': 'outer',
    //   'textMargin': '16',
    //   'responsive': true,
    //   'animation': {
    //     'type': 'spinToStop',
    //     'duration': 5,
    //     'direction': 'clockwise',
    //     'callbackSound': () => { this.playSound },
    //     'callbackFinished': this.callbackAlert,
    //   },
    //   'pins':
    //   {
    //     'number': this.numberOfParticipants
    //   }
    // });
  }


  before() {
    this._audioService.playSound('roulette');
  }

  after() {

    this._audioService.playSound('success');
  }

  callbackAlert(indicatedSegment) {
    this._audioService.playSound('success');
  }

  playSound() {
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
