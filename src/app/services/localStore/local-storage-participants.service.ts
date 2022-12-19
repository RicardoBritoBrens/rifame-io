import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IParticipants } from "src/app/models/IParticipants";
import { Constants } from "src/app/utils/constants";
import { LocalStorageReferenceService } from './local-storage-reference.service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageParticipantsService {

  private _participantsMockUrl: string = "/assets/data/participants.json";
  private _winnersMockUrl: string = "/assets/data/winners.json";

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) {

  }

  getParticipantsMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(this._participantsMockUrl);
  }

  getWinnersMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(this._winnersMockUrl);
  }

  saveAllParticipants(json): void {
    this.localStorageService.setData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(json))
  }

  getParticipantsFromLocalStorage(): Observable<IParticipants[]> {

    let storageJson = this.localStorageService.getData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(JSON.parse(storageJson)));

    return of(participantsArray);
  }


  getMockParticipants(): Observable<IParticipants[]> {
    let mockParticipants: IParticipants[] = [
      {
        id: 1,
        name: "ARDRA"
      },
      {
        id: 2,
        name: "AUGUSTINA"
      },
      {
        id: 3,
        name: "BAMBY"
      },
      {
        id: 4,
        name: "BERYLE"
      },
      {
        id: 5,
        name: "CARLY"
      },
      {
        id: 6,
        name: "CATHYLEEN"
      },
      {
        id: 7,
        name: "CHELSAE"
      },
      {
        id: 8,
        name: "CLAYBORNE"
      },
      {
        id: 9,
        name: "DORE"
      },
      {
        id: 10,
        name: "DOROTHY"
      },
      {
        id: 11,
        name: "LEOLA"
      },
      {
        id: 12,
        name: "LINOEL"
      },
      {
        id: 13,
        name: "LORITA"
      },
      {
        id: 14,
        name: "NORAH"
      },
      {
        id: 15,
        name: "SILVIA"
      }
    ]
    return of(mockParticipants)
  }

  removeParticipants(): void {
    this.localStorageService.removeData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

}
