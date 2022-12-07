import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageReferenceService } from './local-storage-reference.service';
import { IParticipants } from '../models/IParticipants';
import { Constants } from "../utils/Constants";


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

  saveAllParticipants(json) {
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
        name: "Cathyleen"
      },
      {
        id: 2,
        name: "Leola"
      },
      {
        id: 3,
        name: "Bamby"
      },
      {
        id: 4,
        name: "Ardra"
      },
      {
        id: 5,
        name: "Carly"
      },
      {
        id: 6,
        name: "Chelsae"
      },
      {
        id: 7,
        name: "Lorita"
      },
      {
        id: 8,
        name: "Linoel"
      },
      {
        id: 9,
        name: "Dorothy"
      },
      {
        id: 10,
        name: "Clayborne"
      },
      {
        id: 11,
        name: "Dore"
      },
      {
        id: 12,
        name: "Norah"
      },
      {
        id: 13,
        name: "Beryle"
      },
      {
        id: 14,
        name: "Augustina"
      },
      {
        id: 15,
        name: "Silvia"
      }
    ]
    return of(mockParticipants)
  }

  removeParticipants() {
    this.localStorageService.removeData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

}
