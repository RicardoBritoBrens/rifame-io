import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from '../local-storage-participants.service';
import { Participant } from '../models/Participant';

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './rifame-participants.component.html',
  styleUrls: ['./rifame-participants.component.css']
})
export class RifameParticipantsComponent implements OnInit {

  participants: Participant[] = [];
  participantsAreLoaded: boolean = true;
  constructor(private participantService: LocalStorageParticipantsService)
  {

  }

  ngOnInit(): void {
    this.participants = this.participantService.getParticipants();
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
