import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-rifame-load-file',
  templateUrl: './rifame-load-file.component.html',
  styleUrls: ['./rifame-load-file.component.css']
})
export class RifameLoadFileComponent implements OnInit {

  @Input()
  visibility: boolean = false;
  convertedJson: String;
  constructor() { }

  ngOnInit(): void {
  }

  fileUpload(event:any){
    console.info(event.target.files);

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onloadend = (event) =>
    {
      console.info(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        this.convertedJson = JSON.stringify(data, undefined,4);

      })
      console.info(workbook);
    }
  }
}
