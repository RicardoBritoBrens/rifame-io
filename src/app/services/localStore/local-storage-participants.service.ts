import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
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
  private participantsTest$ = new Subject<IParticipants[]>();
  private participantsStorageTest: IParticipants[] = []

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) {

  }

  addParticipantsTest(participant: IParticipants) {
    this.participantsStorageTest.push(participant);
    this.participantsTest$.next(this.participantsStorageTest)
  }

  getParticipantsTest$(): Observable<IParticipants[]> {
    return this.participantsTest$.asObservable();
  }

  loadMockParticipantsToLocalStorage() {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(this.mockParticipants))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    this.participantsTest$.next(participantsArray)
  }

  removeParticipant(participant: IParticipants) {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    participantsArray = participantsArray.filter(x => x.name != participant.name);

    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray))

    this.participantsTest$.next(participantsArray)
  }



  get refresh$() {
    return this._participants$;
  }

  getParticipantsMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(environment.PARTICIPANTS_MOCK_URL);
  }

  getWinnersMock(): Observable<IParticipants[]> {
    return this.http.get<IParticipants[]>(environment.WINNERS_MOCK_URL);
  }

  saveAllParticipants(json): void {
    debugger;
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(json))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipants[] = JSON.parse(JSON.parse(storageJson));

    this.participantsTest$.next(participantsArray)
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


}
