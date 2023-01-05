import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
@Component({
  selector: 'app-rifame-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _localStorageParticipantService: LocalStorageParticipantsService) { }

  ngOnInit(): void {
  }

  // TODO: LIST OF JAVASCRIPT LIBRARIES TO CREATE TOURS
  /**
   * Intro.js
   * driver.js
   * shepherd
   * bootstrap-tour
   * chardin.js
   * hopscotch
   */


}
