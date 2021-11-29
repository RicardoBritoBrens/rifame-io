import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { LocalStorageParticipantsService } from '../local-storage-participants.service';
@Component({
  selector: 'app-rifame-load-file',
  templateUrl: './rifame-load-file.component.html',
  styleUrls: ['./rifame-load-file.component.css']
})
export class RifameLoadFileComponent implements OnInit {

  @Input()
  participantsTableAndImageIsVisibility: boolean = false;
  convertedJson: String;
  @Output() loadFileModalIsVisible = new EventEmitter<boolean>();

  constructor(private participantService: LocalStorageParticipantsService) { }

  ngOnInit(): void {
  }

  fileUpload(event: any) {

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsBinaryString(selectedFile);

    fileReader.onloadend = (event) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });

      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedJson = JSON.stringify(data);
      })

      this.participantService.saveAllParticipants(this.convertedJson);

      this.participantsTableAndImageIsVisibility = false;

      this.loadFileModalIsVisible.emit(false);

    }
  }
}
