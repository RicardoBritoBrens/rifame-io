import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { LocalStorageParticipantsService } from '../../../../../services/local-storage-participants.service';
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

      this.IsVisibility = false;

      this.VisibilityEventEmitter.emit(false);

    }
  }
}
