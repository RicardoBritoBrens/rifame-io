import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from '../../../../services/local-storage-participants.service';
import { IParticipants } from '../../../../models/IParticipants';
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

let ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit, AfterViewInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'fullName'];
  dataSource = new MatTableDataSource<IParticipants>();

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
    this.storageService.getMockAllParticipantsFromLocalStorage()
      .subscribe(data => {
        this.participants = data;
        this.dataSource = new MatTableDataSource<IParticipants>(data)
      }
      );

    if (this.participants?.length > 0) {
      this.loadFileIsVisible = false;
    }


  }

}
