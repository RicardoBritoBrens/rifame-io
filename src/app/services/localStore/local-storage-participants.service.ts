import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, pairs, Subject } from 'rxjs';
import { IParticipants } from "src/app/models/IParticipants";
import { environment } from "src/environments/environment";
import { LocalStorageReferenceService } from './local-storage-reference.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageParticipantsService {

  mockParticipants: IParticipants[] = [
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

  private _participants$ = new Subject<IParticipants[]>();
  private _participantsStorage: IParticipants[] = []

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) {
  }


  getParticipants$(): Observable<IParticipants[]> {
    return this._participants$.asObservable();
  }

  addParticipant(participant: IParticipants) {

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    participantsArray.push(participant);
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));

    this._participantsStorage.push(participant);
    this._participants$.next(this._participantsStorage);
  }

  removeParticipant(participant: IParticipants) {

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    participantsArray = participantsArray.filter(x => x.name != participant.name);

    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray))

    this._participantsStorage = participantsArray;

    this._participants$.next(participantsArray)
  }

  saveAllParticipants(json): void {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, json)
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));
    this._participantsStorage = participantsArray;
    this._participants$.next(participantsArray)
  }

  getParticipantsFromLocalStorage(): Observable<IParticipants[]> {

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    return of(participantsArray);
  }

  getMockParticipants(): Observable<IParticipants[]> {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));
    return of(participantsArray);
  }

  removeParticipants(): void {
    this.localStorageService.removeData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

  isMode(questionMode: string): boolean {
    let rawOutput = JSON.parse(this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_MODE));
    if (rawOutput !== null && rawOutput !== undefined) {
      return (rawOutput === questionMode)
    }
  }

  setModeAs(value: string) {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_MODE, JSON.stringify(value))
  }

  loadMockParticipantsToLocalStorage() {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(this.mockParticipants))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    this._participantsStorage = participantsArray;

    this._participants$.next(participantsArray)
  }

  getParticipantsMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(environment.PARTICIPANTS_MOCK_URL);
  }

  getWinnersMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(environment.WINNERS_MOCK_URL);
  }
}
