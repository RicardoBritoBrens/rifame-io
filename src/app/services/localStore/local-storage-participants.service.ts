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

  getAllParticipantsFromLocalStorage(): Observable<IParticipants[]> {

    let storageJson = this.localStorageService.getData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(JSON.parse(storageJson)));

    return of(participantsArray);
  }


  getMockAllParticipantsFromLocalStorage(): Observable<IParticipants[]> {

    let mockParticipants: IParticipants[] = [
      {
        id: 1,
        name: "Ardra"
      },
      {
        id: 2,
        name: "Augustina"
      },
      {
        id: 3,
        name: "Bamby"
      },
      {
        id: 4,
        name: "Beryle"
      },
      {
        id: 5,
        name: "Carly"
      },
      {
        id: 6,
        name: "Cathyleen"
      },
      {
        id: 7,
        name: "Chelsae"
      },
      {
        id: 8,
        name: "Clayborne"
      },
      {
        id: 9,
        name: "Dore"
      },
      {
        id: 10,
        name: "Dorothy"
      },
      {
        id: 11,
        name: "Leola"
      },
      {
        id: 12,
        name: "Linoel"
      },
      {
        id: 13,
        name: "Lorita"
      },
      {
        id: 14,
        name: "Norah"
      },
      {
        id: 15,
        name: "Silvia"
      }
    ]
    return of(mockParticipants)
  }

  removeParticipants(): void {
    this.localStorageService.removeData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

}
