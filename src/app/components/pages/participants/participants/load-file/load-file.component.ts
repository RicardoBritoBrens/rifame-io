import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css']
})
export class LoadFileComponent implements OnInit {

  @Input()
  IsVisibility: boolean = false;

  convertedJson: String;
  @Output() VisibilityEventEmitter = new EventEmitter<boolean>();

  constructor(
    private participantService: LocalStorageParticipantsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  public fileUpload(event: any): void {
    try {
      debugger;
      const selectedFile = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsBinaryString(selectedFile);
      fileReader.onloadend = (event) => {

        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData, { type: 'binary' });

        if (workbook.SheetNames.length == 0) {
          this.notificationService.warning("Archivo no contine hojas de trabajo, favor validar el formato de ejemplo");
          return;
        }

        workbook.SheetNames.forEach(sheet => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.convertedJson = JSON.stringify(data);
        });

        if (this.convertedJson.length == 0) {
          this.notificationService.warning("Algo fue mal, verifique el formato de su archivo");
        } else {

          this.participantService.saveAllParticipants(this.convertedJson);
          this.notificationService.success("Archivo cargado correctamente");

          this.IsVisibility = false;
          this.VisibilityEventEmitter.emit(false);
        }
      }
    } catch (error) {
      this.notificationService.error("Algo fue mal, favor contactar con el creador de la aplicación");
    }
  }
}
