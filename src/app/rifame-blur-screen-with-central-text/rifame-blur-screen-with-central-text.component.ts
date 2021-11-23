import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rifame-blur-screen-with-central-text',
  templateUrl: './rifame-blur-screen-with-central-text.component.html',
  styleUrls: ['./rifame-blur-screen-with-central-text.component.css']
})
export class RifameBlurScreenWithCentralTextComponent implements OnInit {

  @Input()
  visibility: boolean = false;

  @Input()
  centerText: String;
  constructor() { }

  ngOnInit(): void {
  }

}
