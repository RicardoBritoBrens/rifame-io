import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Colors } from 'src/assets/colors';

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

  confirmAction(callback: Function) {
    Confirm.show(
      'Confirm',
      'Are you sure you want to perform this action?',
      'Yes',
      'No',
      () => {
        callback();
      },
      () => {
      },
      {
        backgroundColor: Colors.Primary,
        messageColor: Colors.Secondary,

        okButtonBackground: Colors.PrimaryExtra,
        okButtonColor: Colors.Secondary,

        cancelButtonBackground: Colors.PrimaryExtra,
        cancelButtonColor: Colors.Secondary,

        titleColor: Colors.Secondary

      },
    );
  }

}
