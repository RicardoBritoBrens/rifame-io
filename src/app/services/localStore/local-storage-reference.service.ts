import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageReferenceService {

  private storageSubject = new Subject();

  constructor() { }

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }
  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSubject.next(data);
  }
  getItem() {
    return localStorage.getItem('currentLang');
  }


  setData(key: string, data: string): void {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
  }

  getData(key: string): string {
    return localStorage.getItem(key);
  }

  removeData(key: string): void {
    localStorage.removeItem(key)
  }
}
