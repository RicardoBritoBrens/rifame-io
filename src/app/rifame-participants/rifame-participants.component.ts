
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
    this.loadParticipants();
  }

  onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.canIShowSuccessAlertMessage();
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  private canIShowSuccessAlertMessage() {
    this.showSuccessAlertMessage = true;
  }

  removeParticipants()
  {
    this.storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
  }

  loadParticipants(){
    this.storageService.getAllParticipantsFromLocalStorage()
      .subscribe(data => this.participants = data);

      if(this.participants?.length > 0){

        this.loadFileIsVisible = false;
      }
  }
}
