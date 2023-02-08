import { Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxWheelComponent, TextOrientation, TextAlignment } from 'ngx-wheel';
import { Subscription } from 'rxjs';
import { IParticipant } from 'src/app/models/IParticipant';
import { AudioService } from 'src/app/services/audio.service';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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
  subscriptionParticipants: Subscription;

  constructor(
    private _audioService: AudioService,
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {
  }

  addNewItem(value: IParticipant) {
    this.newItemEvent.emit(value);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  reset() {
    this.wheel.reset();
  }

  before() {
    this._audioService.playSound('roulette');
  }

  after() {
    debugger;
    let toRemoveOrPromoteParticipant = this.listOfParticipants[this.idToLandOn];

    this._participantService.promoteParticipant(toRemoveOrPromoteParticipant);

    this._participantService.removeParticipant(toRemoveOrPromoteParticipant);

    this.wheel.removeSegmentById(this.idToLandOn);

    this._notificationService.success(`El ganador ha sido ${this.listOfParticipants[this.idToLandOn].name}`);

    this._audioService.playSound('success');

    this.newItemEvent.emit(toRemoveOrPromoteParticipant);

    this.reset();

    // TODO: USE DIFFERENT PALETTE OF COLOR ONLY WITHOUT SHOWING NAME BECAUSE WITH MORE THAN 100 THE UI IS NOT GOOD LOOKING
    // CHECK THIS LINK https://mycolor.space/?hex=%2366806A&sub=1

    //this.listOfParticipants = this.listOfParticipants.slice(toRemoveParticipantIndex, 1);
    // Get the first random winner
    //this.idToLandOn = this.getRandomIntByData(this.listOfParticipants);
    // Generate random color forEach participants
    // this.generateRandomColorForEachParticipants(this.listOfParticipants);
    // Initialize wheel colors, segments and names
    //this.items = this.listOfParticipantsWithColors;
  }

  // async spin(prize) {
  //   this.idToLandOn = prize;
  //   await new Promise(resolve => setTimeout(resolve, 0));
  //   this.wheel.spin();
  // }

  // getRandomColor(): string {
  //   let color = '#';
  //   const letters = '0123456789ABCDEF';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  // private generateRandomColorForEachParticipants(listOfParticipants: IParticipants[]) {
  //   listOfParticipants.forEach((element) => {
  //     this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor(), id: element.id, textFontSize: environment.WHEEL_TEXT_FONT_SIZE })
  //   });
  // }

  // private getRandomIntByData(data: IParticipants[]): any {
  //   return data[Math.floor(Math.random() * this.seed.length)].id;
  // }

  ngOnDestroy(): void {
    if (this.subscriptionParticipants) {
      this.subscriptionParticipants.unsubscribe();
    }
  }

}
