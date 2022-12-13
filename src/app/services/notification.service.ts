import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string) {
    Notify.success(message);
  }

  warning(title: string) {
    Notify.warning(title);
  }

  error(title: string) {
    Notify.failure(title);
  }
}
