import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rifame-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  tittle: string = 'Rifame.io';
  slogan: string = 'Simple y Funcional';

  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.tittle}`);
  }

  ngOnInit(): void {
  }

}
