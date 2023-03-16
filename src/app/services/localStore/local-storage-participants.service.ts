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

  private mockParticipants: IParticipant[] = [
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
  private _winners$ = new Subject<IParticipant[]>();
  private _winnersStorage: IParticipant[] = [];

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) {
  }

  public participantsAlreadyExist(): boolean {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    if (storageJson !== null) {
      let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
      return (participantsArray.length > 0)
    }
  }

  public loadParticipantsFromExistingStorage() {
    debugger;
    console.log('Inicio carga json con los participantes guardados');
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));

    this._participantsStorage = participantsArray;

    if (participantsArray != null && participantsArray.length != 0) {
      console.log(`Existen ${participantsArray.length} participantes que serán cargados a la lista en el servicio Local Storage Participants Service`);
      this._participants$.next(participantsArray);
    } else {
      console.log(`No existen participantes guardados anterirormente`);
    }

    console.log('Fin carga json con los participantes guardados');
  }

  public loadWinnersFromExistingStorage() {
    //let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    //let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    //this._participantsStorage = participantsArray;
    //this._winners$.next(this._winnersStorage);
  }

  public getParticipants$(): Observable<IParticipant[]> {
    return this._participants$.asObservable();
  }

  public addParticipant(participant: IParticipant) {
    debugger;
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
    if (this._participantsStorage == null) {
      this._participantsStorage = [];
    }
    this._participants$.next();
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
    this._participantsStorage = [];
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

  public getCurrentParticipantsLocal$(): Observable<IParticipant[]> {
    return of(this._participantsStorage);
  }

  public getWinners$(): Observable<IParticipant[]> {
    return this._winners$.asObservable();
  }

  public promoteParticipant(participant: IParticipant) {
    this._winnersStorage.push(participant);
    this._winners$.next(this._winnersStorage);
  }

  private getParticipantsArrayFromJsonStorage() {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    return participantsArray;
  }

  private saveToJsonStorage(participantsArray: IParticipant[]) {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));
  }

  private updateIds(participants: IParticipant[]): IParticipant[] {
    let startId = 1;
    participants.forEach((element) => {
      element.id = startId;
      startId++;
    })
    return participants;
  }

}
