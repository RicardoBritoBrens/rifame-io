import { Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxWheelComponent, TextOrientation, TextAlignment } from 'ngx-wheel';
import { Subscription } from 'rxjs';
import { IParticipant } from 'src/app/models/IParticipant';
import { AudioService } from 'src/app/services/audio.service';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import party from "party-js";
import { TestService } from 'src/app/test.service';


@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, OnDestroy {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  seed = [...Array(12).keys()]

  @Output() newItemEvent = new EventEmitter<IParticipant>();

  @Input() numberOfParticipants: number = 0;
  @Input() listOfParticipants: IParticipant[] = [];
  @Input() listOfParticipantsWithColors: { text: String, fillStyle: String, id: number, textFontSize: number }[];
  @Input() idToLandOn: number;

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
  isLoading: boolean = true;
  isDisable: boolean;
  subscriptionParticipants: Subscription;
  canIShowWinnerName: boolean;
  currentWinnerName: String;


  constructor(
    private _audioService: AudioService,
    private _audioServiceTest: TestService,
    private _notificationService: NotificationService) {
  }


  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.canIShowWinnerName = false;
    this.currentWinnerName = '';
    this.isDisable = false;
  }

  showConfetti() {
    this.isDisable = true;
    let confettiShowTime: number = 1500;
    let intervals: any[] = [];

    for (let i = 0; i < 10; i++) {
      intervals.push(setTimeout(() => {
        party.confetti(new MouseEvent('click', { clientX: this.getRandomArbitrary(150, 500), clientY: this.getRandomArbitrary(150, 500) }));
      }, confettiShowTime));

      confettiShowTime += 1000;
    }

    setTimeout(() => { }, confettiShowTime);


    this.isDisable = false;
  }

  addNewItem(value: IParticipant) {
    this.newItemEvent.emit(value);
  }


  spin() {
    this.wheel.spin();
  }

  reset() {
    this.wheel.reset();
  }

  before() {
    this._audioService.playSound('roulette');
  }

  after() {

    // TODO: APP MUST PASS THROUGHOUT THE HOME AND PARTICIPANTS PAGES TO MAKE WORK THE RAFFLES.
    // TODO: CHECK WHAT HAPPENS WHEN THE USER REFRESH THE PAGE THE APP IS IN A NOT WORKING STATE.

    this.idToLandOn = this.getRandomIntByData(this.listOfParticipants);

    let toRemoveOrPromoteParticipant = this.listOfParticipants[this.idToLandOn];

    this._audioServiceTest.promoteParticipant(toRemoveOrPromoteParticipant);

    this._audioServiceTest.removeParticipant(toRemoveOrPromoteParticipant);

    this.wheel.removeSegmentById(this.idToLandOn);

    this.canIShowWinnerName = true;

    this.currentWinnerName = this.listOfParticipants[this.idToLandOn].name;

    this._notificationService.success(`El ganador ha sido ${this.listOfParticipants[this.idToLandOn].name}`);

    this._audioService.playSound('success');
    this.showConfetti();

    this.newItemEvent.emit(toRemoveOrPromoteParticipant);

    this.reset();

    this.canIShowWinnerName = false;
  }

  private getRandomIntByData(data: IParticipant[]): any {
    return data[Math.floor(Math.random() * data.length - 1)].id;
  }

  ngOnDestroy(): void {
    if (this.subscriptionParticipants) {
      this.subscriptionParticipants.unsubscribe();
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
