import { Colors } from 'src/assets/colors';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Injectable } from '@angular/core';
import { Loading } from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Notiflix from 'notiflix';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  options: Notiflix.INotifyOptions = {
    position: 'left-bottom'
  };

  constructor() { }
  public success(message: string) {
    Notify.success(`${message} 😊`, this.options);
  }
  public warning(message: string) {
    Notify.warning(`${message} 😔`, this.options);
  }
  public error(message: string) {
    Notify.failure(`${message} 😅`, this.options);
  }
  public loadingStart() {
    Loading.standard("Loading...");
  }
  public loadingStop() {
    Loading.remove();
  }
  public confirmActionAsync(): Promise<Boolean> {
    let result: Boolean = false;
    return new Promise((resolve, reject) => {
      Confirm.show(
        'Confirm',
        'Are you sure you want to perform this action?',
        'Yes',
        'No',
        () => {
          result = true;
          return resolve(result);
        },
        () => {
          result = false;
          return reject(result);
        },
        {
          backgroundColor: Colors.Primary,
          messageColor: Colors.Secondary,
          okButtonBackground: Colors.PrimaryExtra,
          okButtonColor: Colors.Secondary,
          cancelButtonBackground: Colors.PrimaryExtra,
          cancelButtonColor: Colors.Secondary,
          titleColor: Colors.Secondary,
        },
      );
    })
  }
  public confirmAction(okCallBack: Function, cancelCallBack: Function) {
    let result: Boolean = false;
    Confirm.show(
      'Confirm',
      'Are you sure you want to perform this action?',
      'Yes',
      'No',
      () => {
        okCallBack();
        result = true;
      },
      () => {
        cancelCallBack();
        result = false;
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
