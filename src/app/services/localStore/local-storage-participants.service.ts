import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IParticipant } from "src/app/models/IParticipant";
import { environment } from "src/environments/environment";
import { LocalStorageReferenceService } from './local-storage-reference.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageParticipantsService {

  mockParticipants: IParticipant[] = [
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

  private _participants$ = new Subject<IParticipant[]>();
  private _participantsStorage: IParticipant[] = [];
  private _listOfParticipantsWithColors = [];

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) {
  }

  participantsAlreadyExist(): boolean {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    if (storageJson !== null) {
      let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
      return (participantsArray.length > 0)
    }
  }

  loadParticipantsFromExistingStorage() {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    this._participantsStorage = participantsArray;
    this._participants$.next(participantsArray);
  }

  public getParticipants$(): Observable<IParticipant[]> {
    return this._participants$.asObservable();
  }

  public addParticipant(participant: IParticipant) {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    if (storageJson === null) {
      let newParticipants: IParticipant[] = [];
      this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(newParticipants));
      storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    }

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    participantsArray.push(participant);

    // calculate ids
    participantsArray = this.updateIds(participantsArray);
    this._participantsStorage = this.updateIds(this._participantsStorage);

    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));
    this._participantsStorage.push(participant);
    this._participants$.next(this._participantsStorage);
  }

  public removeParticipant(participant: IParticipant) {

    // Get participants
    let participants: IParticipant[] = this.getParticipantsArrayFromJsonStorage();

    // Get current index
    let index = participants.findIndex(x => x.id == participant.id);

    // Remove element from participants
    participants.splice(index, 1);

    // Update Id's
    participants = this.updateIds(participants);

    // Assign new participants to local array
    this._participantsStorage = participants;

    // Save lasts changes
    this.saveToJsonStorage(participants);

    // Emit new values
    this._participants$.next(participants);
  }

  private getParticipantsArrayFromJsonStorage() {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    return participantsArray;
  }

  private saveToJsonStorage(participantsArray: IParticipant[]) {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));
  }

  public getCurrentQuantityOfParticipants(): number {
    return this._participantsStorage.length;
  }

  public getCurrentParticipants(): IParticipant[] {
    return this._participantsStorage;
  }

  public saveAllParticipants(json): void {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, json)
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    this._participantsStorage = participantsArray;
    this._participants$.next(participantsArray)
  }

  public getParticipantsFromLocalStorage(): Observable<IParticipant[]> {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    return of(participantsArray);
  }

  public getMockParticipants(): Observable<IParticipant[]> {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    return of(participantsArray);
  }

  public removeParticipants(): void {
    this.localStorageService.removeData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

  public isMode(questionMode: string): boolean {
    let rawOutput = JSON.parse(this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_MODE));
    if (rawOutput !== null && rawOutput !== undefined) {
      return (rawOutput === questionMode)
    }
  }

  public setModeAs(value: string) {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_MODE, JSON.stringify(value))
  }

  public loadMockParticipantsToLocalStorage() {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(this.mockParticipants))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));

    this._participantsStorage = participantsArray;

    this._participants$.next(participantsArray)
  }

  public getParticipantsMock(): Observable<IParticipant[]> {
    return this.http.get<IParticipant[]>(environment.PARTICIPANTS_MOCK_URL);
  }

  public getWinnersMock(): Observable<IParticipant[]> {
    return this.http.get<IParticipant[]>(environment.WINNERS_MOCK_URL);
  }

  private updateIds(participants: IParticipant[]): IParticipant[] {
    let startId = 1;
    participants.forEach((element) => {
      element.id = startId;
      startId++;
    })
    return participants;
  }

  public getCurrentParticipantsLocal$(): Observable<IParticipant[]> {
    return of(this._participantsStorage);
  }
}
