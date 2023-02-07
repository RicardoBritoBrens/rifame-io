import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IParticipant } from 'src/app/models/IParticipant';


@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  seed = [...Array(12).keys()]
  idToLandOn: number;
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
  isLoading: boolean = true;

  numberOfParticipants: number = 0;
  listOfParticipants: IParticipant[] = [];
  listOfParticipantsWithColors: { text: String, fillStyle: String, id: number, textFontSize: number }[];

  //   fillStyle: colors[value % 2],
  //   text: `Prize ${value}`,
  //   id: value,
  //   textFillStyle: 'white',
  //   textFontSize: '16'

  subscriptionParticipants: Subscription;

  constructor(
    private _audioService: AudioService,
    private _participantService: LocalStorageParticipantsService,
    private _notificationService: NotificationService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this._participantService.getCurrentParticipantsLocal$().subscribe((data) => {

      if (data) {

        // Clear
        this.listOfParticipantsWithColors = [];
        this.listOfParticipants = [];

        // Assign new values
        this.listOfParticipants = data;
        this.numberOfParticipants = data.length;

        // Get the first random winner
        this.idToLandOn = this.getRandomIntByData(data);

        // Generate random color forEach participants
        this.generateRandomColorForEachParticipants(data);

        // Initialize wheel colors, segments and names
        this.items = this.listOfParticipantsWithColors;

        // Disable loading
        this.isLoading = false;
      }
    })
  }

  reset() {
    this.wheel.reset();
  }

  before() {
    this._audioService.playSound('roulette');
  }

  after() {
    // TODO: TRY TO REMOVE THE FROM THE PARTICIPANTS LIST AND ADDING TO THE WINNERS
    /*
      Works in the back but in the ui is only available but using the library itself method deleteSegment check this link: http://dougtesting.net/winwheel/docs/tut5_add_remove_segments
    */
    debugger;

    let toRemoveParticipant = this.listOfParticipants[this.idToLandOn];
    let toRemoveParticipantIndex = this.listOfParticipants.indexOf(toRemoveParticipant);
    this.listOfParticipants = this.listOfParticipants.slice(toRemoveParticipantIndex, 1);
    this._participantService.removeParticipant(toRemoveParticipant);
    this.wheel.removeSegmentById(this.idToLandOn);


    // Get the first random winner
    this.idToLandOn = this.getRandomIntByData(this.listOfParticipants);

    // Generate random color forEach participants
    this.generateRandomColorForEachParticipants(this.listOfParticipants);

    // Initialize wheel colors, segments and names
    this.items = this.listOfParticipantsWithColors;

    this._notificationService.success(`El ganador ha sido ${this.listOfParticipants[this.idToLandOn].name}`);
    this._audioService.playSound('success');


  }

  async spin(prize) {
    this.idToLandOn = prize;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  private getRandomColor(): string {
    let color = '#';
    const letters = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generateRandomColorForEachParticipants(listOfParticipants: IParticipant[]) {
    listOfParticipants.forEach((element) => {
      this.listOfParticipantsWithColors.push({ text: element.name, fillStyle: this.getRandomColor(), id: element.id, textFontSize: environment.WHEEL_TEXT_FONT_SIZE })
    });
  }

  private getRandomIntByData(data: IParticipant[]): any {
    return data[Math.floor(Math.random() * this.seed.length)].id;
  }


}
