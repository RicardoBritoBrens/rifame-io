import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AudioService } from 'src/app/services/audio.service';

declare let TweenMax: any;
declare let Winwheel: any;

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, AfterViewInit {
  constructor(private _audioService: AudioService) {

  }
  ngOnInit(): void {

  }

  @ViewChild('wheelContainer') wheelContainer: ElementRef;
  theWheel;
  async ngAfterViewInit() {
    this.drawWheel();
  }
  drawWheel() {
    this.theWheel = new Winwheel({
      'canvasId': 'canvas',
      'numSegments': 4,
      'segments': [{
        'fillStyle': '#eae56f',
        'text': 'Segment 1'
      }, {
        'fillStyle': '#89f26e',
        'text': 'Segment 2'
      }, {
        'fillStyle': '#7de6ef',
        'text': 'Segment 3'
      }, {
        'fillStyle': '#e7706f',
        'text': 'Segment 4'
      }],
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
}
