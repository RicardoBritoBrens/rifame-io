import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageReferenceService } from './local-storage-reference.service';
import { IParticipants } from './models/IParticipants';
import { Constants } from "./rifame-common/Constants";
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

  removeParticipants() {
    this.localStorageService.removeData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

}
