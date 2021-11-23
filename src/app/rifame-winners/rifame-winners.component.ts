import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from '../local-storage-participants.service';
import { Participant } from '../models/Participant';

@Component({
  selector: 'app-rifame-winners',
  templateUrl: './rifame-winners.component.html',
  styleUrls: ['./rifame-winners.component.css']
})
export class RifameWinnersComponent implements OnInit {

  winners: Participant[] = [];
  participantsAreLoaded: boolean = true;
  constructor(private participantService: LocalStorageParticipantsService)
  {

  }

  ngOnInit(): void {
    this.winners = this.participantService.getWinners();
  }

  public show(): void
  {
    this.participantsAreLoaded = true;
  }

  public hide(): void
  {
    this.participantsAreLoaded = false;
  }

}
