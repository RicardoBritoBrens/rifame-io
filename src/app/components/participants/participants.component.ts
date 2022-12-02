import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from '../../services/local-storage-participants.service';
import { IParticipants } from '../../models/IParticipants';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Celso Marti' },
  { position: 2, name: 'Marcos Antonio Crespo' },
  { position: 3, name: 'Antonio Manuel Carballo' },
  { position: 4, name: 'Angel Maria Redondo' },
  { position: 5, name: 'Ahmed Sales' },
  { position: 6, name: 'Dario Amado' },
  { position: 7, name: 'Jorge Juan Aguilera' },
  { position: 8, name: 'Luca Muñoz' },
  { position: 9, name: 'Florencio Castillo' },
  { position: 10, name: 'Roberto Zaragoza' },
  { position: 11, name: 'Adrian Taboada' },
  { position: 12, name: 'Vasile Bolaños' },
  { position: 13, name: 'Pedro Caamaño' },
  { position: 14, name: 'Nicolas Berenguer' },
  { position: 15, name: 'Jacobo Gascon' },
  { position: 16, name: 'Jose Angel Hernando' },
  { position: 17, name: 'Bernabe Falcon' },
  { position: 18, name: 'Hamid Lema' },
  { position: 19, name: 'Jorge Luis Adan' },
  { position: 20, name: 'Jose Juan Sánchez' }
];

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit, AfterViewInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  participants: IParticipants[] = [];
  loadFileIsVisible: boolean = true;
  showSuccessAlertMessage: boolean = false;
  showErrorAlertMessage: boolean = false;
  constructor(private storageService: LocalStorageParticipantsService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  private onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.canIShowSuccessAlertMessage();
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  private canIShowSuccessAlertMessage() {
    this.showSuccessAlertMessage = true;
  }

  private removeParticipants() {
    this.storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
  }

  private loadParticipants() {
    this.storageService.getAllParticipantsFromLocalStorage()
      .subscribe(data => this.participants = data);

    if (this.participants?.length > 0) {
      this.loadFileIsVisible = false;
    }
  }

}
