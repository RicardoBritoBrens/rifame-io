import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageParticipantsService } from '../local-storage-participants.service';
import { Participant } from '../models/Participant';

@Component({
  selector: 'app-rifame-winners',
  templateUrl: './rifame-winners.component.html',
  styleUrls: ['./rifame-winners.component.css']
})
export class RifameWinnersComponent implements OnInit {

  winners: Participant[] = null;
  participantsAreLoaded: boolean = true;
  constructor(private participantService: LocalStorageParticipantsService)
  {

  }

  ngOnInit(): void {
    this.participantService.getWinnersMock().
    subscribe(data => this.winners = data);
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
