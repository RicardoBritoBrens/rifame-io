import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rifame-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  tittle: string = environment.APP_TITLE;
  slogan: string = environment.APP_SLOGAN;

  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.tittle}`);
  }

  ngOnInit(): void {
  }

}
