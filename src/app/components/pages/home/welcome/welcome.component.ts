import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
@Component({
  selector: 'app-rifame-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _storageService: LocalStorageParticipantsService,
  ) { }

  ngOnInit(): void {
    this._storageService.loadParticipantsFromExistingStorage();
  }

}
