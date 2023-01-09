import { Injectable } from '@angular/core';
import { IParticipants } from 'src/app/models/IParticipants';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { LocalStorageParticipantsService } from '../localStore/local-storage-participants.service';
import { NotificationService } from '../notification/notification.service';
@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ExportResult";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  };

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

            // get sheet data
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

            // iterate over array of element
            data.forEach(element => {

              // validate field with regular expression
              if (!RegExp(environment.NAME_FIELD_REGULAR_EXPRESSION).test((element as IParticipants).name.toUpperCase())) {
                Promise.reject(`Value ${(element as IParticipants).name.toUpperCase} is invalid`)
              }

              // convert to upper case the name value
              (element as IParticipants).name = (element as IParticipants).name.toUpperCase();
            });

            // convert all the data into json stringify
            this.convertedJson = JSON.stringify(data);
          });

          if (this.convertedJson.length == 0) {
            result = false;
            return resolve(result);
          } else {
            this._participantService.saveAllParticipants(this.convertedJson);
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

  private exportTableToExcel(tableId: string, name?: string) {
    let { sheetName, fileName } = this.getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  private exportArrayToExcel(arr: any[], name?: string) {
    let { sheetName, fileName } = this.getFileName(name);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  public download(participants: IParticipants[]): void {
    this.exportArrayToExcel(participants, "ParticipantsTemplate");
  }
}
