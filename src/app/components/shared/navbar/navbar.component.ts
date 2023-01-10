import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rifame-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  tittle: string;
  slogan: string;

  constructor(private titleService: Title) {
    this.titleService.setTitle($localize`${this.tittle}`);
  }

  ngOnInit(): void {
    this.tittle = 'Rifame.io';
    this.slogan = 'Simple y Funcional';
  }

}
