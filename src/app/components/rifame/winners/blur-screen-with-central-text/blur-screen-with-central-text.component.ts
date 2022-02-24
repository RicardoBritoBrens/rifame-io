import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rifame-blur-screen-with-central-text',
  templateUrl: './blur-screen-with-central-text.component.html',
  styleUrls: ['./blur-screen-with-central-text.component.css']
})
export class BlurScreenWithCentralTextComponent implements OnInit {

  @Input()
  visibility: boolean = false;

  @Input()
  centerText: String;
  constructor() { }

  ngOnInit(): void {
  }

}
