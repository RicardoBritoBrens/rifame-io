import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rifame-load-file',
  templateUrl: './rifame-load-file.component.html',
  styleUrls: ['./rifame-load-file.component.css']
})
export class RifameLoadFileComponent implements OnInit {

  @Input()
  visibility: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
