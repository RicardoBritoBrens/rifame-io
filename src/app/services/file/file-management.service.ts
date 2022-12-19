import { Injectable } from '@angular/core';
import { IParticipants } from 'src/app/models/IParticipants';
import * as XLSX from 'xlsx';
import { LocalStorageParticipantsService } from '../localStore/local-storage-participants.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  convertedJson: string;

  constructor(
    private _notificationService: NotificationService,
    private _participantService: LocalStorageParticipantsService) { }

  public Upload(event: any): Promise<Boolean> {
    let result: Boolean = false;
    return new Promise((resolve, reject) => {
      try {
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsBinaryString(selectedFile);
        fileReader.onloadend = (event) => {
          let binaryData = event.target.result;
          let workbook = XLSX.read(binaryData, { type: 'binary' });

          if (workbook.SheetNames.length == 0) {
            this._notificationService.warning("Archivo no contine hojas de trabajo, favor validar el formato de ejemplo");
            return;
          }

          workbook.SheetNames.forEach(sheet => {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            this.convertedJson = JSON.stringify(data);
          });

          if (this.convertedJson.length == 0) {
            this._notificationService.warning("Algo fue mal, verifique el formato de su archivo");
          } else {

            this._participantService.saveAllParticipants(this.convertedJson);

            this._notificationService.success("Archivo cargado correctamente");
            result = true;
            return resolve(result);
          }
        }
      } catch (error) {
        this._notificationService.error("Algo fue mal, favor contactar con el creador de la aplicación");
        result = false;
        return reject(result);
      }
    });

  }

  public Download(participants: IParticipants[]): void {
    throw new Error('Method not implemented.');
  }


}
