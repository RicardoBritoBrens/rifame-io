import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageReferenceService {

  constructor() { }

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
