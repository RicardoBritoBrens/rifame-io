
import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from '../local-storage-participants.service';
import { IParticipants } from '../models/IParticipants';

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './rifame-participants.component.html',
  styleUrls: ['./rifame-participants.component.css']
})
export class RifameParticipantsComponent implements OnInit {

  participants: IParticipants[] = [];
  loadFileIsVisible: boolean = true;
  showSuccessAlertMessage: boolean = false;
  showErrorAlertMessage: boolean = false;

  constructor(private storageService: LocalStorageParticipantsService) {

  }

  ngOnInit(): void {

    console.log('Loading participants');
      this.storageService.getAllParticipantsFromLocalStorage()
      .subscribe(data => this.participants = data);

      console.log('Validate participants length');
      if(this.participants?.length > 0){

        console.log('Disable loadFileModule');
        this.loadFileIsVisible = false;
      }
  }


  onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.showSuccessAlertMessage = true;
    this.loadFileIsVisible = false;
  }
}
