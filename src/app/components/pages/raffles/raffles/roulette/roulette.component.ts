import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AudioService } from 'src/app/services/audio.service';
import { IParticipants } from 'src/app/models/IParticipants';

declare let TweenMax: any;
declare let Winwheel: any;

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, AfterViewInit {

  @Input() numberOfParticipants: number = 0;
  //@Input()
  listOfParticipants: IParticipants[] = [];
  listOfParticipantsWithColors: { text: String, fillStyle: String }[]
  constructor(private _audioService: AudioService) {

  }
  ngOnInit(): void {
    debugger;
    this.generateRandomColorForEachParticipants(this.listOfParticipants)
  }

  generateRandomColorForEachParticipants(listOfParticipants: IParticipants[]) {
    debugger;
    listOfParticipants.forEach((element) => {
      this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor() })
    });
  }

  @ViewChild('wheelContainer') wheelContainer: ElementRef;
  theWheel;
  async ngAfterViewInit() {
    debugger;
    this.drawWheel();
  }
  drawWheel() {
    this.theWheel = new Winwheel({
      'canvasId': 'canvas',
      'numSegments': this.numberOfParticipants,
      'segments': this.listOfParticipantsWithColors,
      'lineWidth': 2,
      'outerRadius': 250,
      'innerRadius': 50,
      'pointerAngle': 90,
      'textAlignment': 'outer',
      'textMargin': '16',
      'responsive': true,
      'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'direction': 'clockwise',
        'callbackSound': () => { this.playSound() },
        'callbackFinished': () => { this.callbackAlert() },
      }
    });
  }
  callbackAlert() {
    debugger;
    this._audioService.playSound('success');
  }
  playSound() {
    debugger;
    this._audioService.playSound('roulette');
  }
  calculatePrize() {
    this.theWheel.startAnimation();
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
