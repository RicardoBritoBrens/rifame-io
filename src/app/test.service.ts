import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IParticipant } from './models/IParticipant';
import { LocalStorageReferenceService } from './services/localStore/local-storage-reference.service';

@Injectable({
  providedIn: 'root'
})
export class TestService implements OnInit {
  private _participants$ = new Subject<IParticipant[]>();
  private _participantsStorage: IParticipant[] = [];

  private _winners$ = new Subject<IParticipant[]>();
  private _winnersStorage: IParticipant[] = [];

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

  constructor(private localStorageService: LocalStorageReferenceService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  getParticipants$(): Observable<IParticipant[]> {
    return this._participants$.asObservable();
  }

  addParticipant(participant: IParticipant) {
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

    this._participantsStorage = participantsArray;
    //this.updateIds(this._participantsStorage);

    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));
    // this._participantsStorage.push(participant);
    // if (this._participantsStorage == null) {
    //   this._participantsStorage = [];
    // }
    this._participants$.next(participantsArray);
  }

  removeParticipant(participant: IParticipant) {

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

  loadMockParticipants() {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(this.mockParticipants))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));

    this._participantsStorage = participantsArray;

    this._participants$.next(participantsArray)
  }

  promoteParticipant(participant: IParticipant) {
    this._winnersStorage.push(participant);
    this._winners$.next(this._winnersStorage);
  }

  getCurrentParticipants(): IParticipant[] {
    return this._participantsStorage;
  }

  loadParticipantsFromExistingStorage() {
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

  loadMockParticipantsToLocalStorage() {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(this.mockParticipants))

    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);

    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));

    this._participantsStorage = participantsArray;

    this._participants$.next(participantsArray)
  }

  private saveToJsonStorage(participantsArray: IParticipant[]) {
    this.localStorageService.setData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS, JSON.stringify(participantsArray));
  }

  private getParticipantsArrayFromJsonStorage() {
    let storageJson = this.localStorageService.getData(environment.KEY_LOCAL_STORAGE_PARTICIPANTS);
    let participantsArray: IParticipant[] = JSON.parse(JSON.parse(storageJson));
    return participantsArray;
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
