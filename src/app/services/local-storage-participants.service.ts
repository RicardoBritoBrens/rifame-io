import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { LocalStorageReferenceService } from './local-storage-reference.service';
import { IParticipants } from '../models/IParticipants';
import { Constants } from "../utils/Constants";
import { PeriodicElement } from "../components/pages/participants/participants/participants.component";

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
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Celso Marti' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Marcos Antonio Crespo' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Antonio Manuel Carballo' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Angel Maria Redondo' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Ahmed Sales' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Dario Amado' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Jorge Juan Aguilera' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Luca Muñoz' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Florencio Castillo' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Roberto Zaragoza' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Adrian Taboada' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Vasile Bolaños' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Pedro Caamaño' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Nicolas Berenguer' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Jacobo Gascon' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Jose Angel Hernando' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Bernabe Falcon' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Hamid Lema' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Jorge Luis Adan' },
      { FirstName: 'Ricardo', LastName: 'Brito Brens', FullName: 'Jose Juan Sánchez' }
    ]

    return of(mockParticipants)
  }

  removeParticipants() {
    this.localStorageService.removeData(Constants.KEY_LOCAL_STORAGE_PARTICIPANTS);
  }

}
