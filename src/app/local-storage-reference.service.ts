import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageReferenceService {


  constructor() { }

 setData(key, data) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(key, jsonData)
 }

 getData(key) {
    return localStorage.getItem(key);
 }

 removeData(key) {
    localStorage.removeItem(key)
 }
}
