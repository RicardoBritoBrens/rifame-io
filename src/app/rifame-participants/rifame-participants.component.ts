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

  constructor(private participantService: LocalStorageParticipantsService)
  {

  }

  ngOnInit(): void {
    this.participants = this.participantService.getParticipants();
  }


}
