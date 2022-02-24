import { Component, OnInit } from '@angular/core';
import { LocalStorageParticipantsService } from '../../services/local-storage-participants.service';
import { IParticipants } from '../../models/IParticipants';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  participants: IParticipants[] = [];
  loadFileIsVisible: boolean = true;
  showSuccessAlertMessage: boolean = false;
  showErrorAlertMessage: boolean = false;
  constructor(private storageService: LocalStorageParticipantsService) {

  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.canIShowSuccessAlertMessage();
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  private canIShowSuccessAlertMessage() {
    this.showSuccessAlertMessage = true;
  }

  removeParticipants()
  {
    this.storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
  }

  loadParticipants(){
    this.storageService.getAllParticipantsFromLocalStorage()
      .subscribe(data => this.participants = data);

      if(this.participants?.length > 0){

        this.loadFileIsVisible = false;
      }
  }

}
