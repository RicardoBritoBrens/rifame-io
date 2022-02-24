import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageParticipantsService } from '../../../services/local-storage-participants.service';
import { Participant } from '../../../models/Participant';

@Component({
  selector: 'app-rifame-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

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
