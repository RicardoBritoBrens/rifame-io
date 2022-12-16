import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from '../../../../services/local-storage-participants.service';
import { IParticipants } from '../../../../models/IParticipants';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { MatSort } from '@angular/material/sort';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-rifame-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit, AfterViewInit {

  testDataSourceParticipants = new MatTableDataSource<IParticipants>();

  addParticipatsForm = this._formBuilder.group([]);
  displayedColumns: string[] = ['id', 'name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<IParticipants>();
  participants: IParticipants[] = [];

  participantCounter: number = 1;

  loadFileIsVisible: boolean = true;
  showSuccessAlertMessage: boolean = false;
  showErrorAlertMessage: boolean = false;
  showWarningAlertMessage: boolean = true;
  mockDataIsLoaded: Boolean = false;

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadFileIsVisible = true;
    this.createForm();
    this.loadParticipants();
  }

  createForm() {
    this.addParticipatsForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  onDelete() {
    this._notificationService.confirmAction(() => this.clearTable());
  }

  clearTable() {
    this.dataSource = new MatTableDataSource<IParticipants>();
    this.participants = [];
    this.participantCounter = 1;
    this.mockDataIsLoaded = false;
    this.addParticipatsForm.controls['name'].setValue('');
  }

  onUpload() {
    this._notificationService.success('Looking good');
  }

  onSubmit(): void {
    if (this.addParticipatsForm.valid) {

      if (this.mockDataIsLoaded == true) {
        this.clearTable();
      }

      let newParticipant: IParticipants = {
        id: this.participantCounter,
        name: this.addParticipatsForm.controls['name'].value
      };

      this.participants.push(newParticipant);
      this.dataSource = new MatTableDataSource<IParticipants>(this.participants);
      this.participantCounter++;

    } else {
      this._notificationService.warning('Field name is require');
    }
  }

  removeParticipants() {
    this._storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
    this.dataSource.connect
  }

  loadParticipants() {
    this._storageService.getMockAllParticipantsFromLocalStorage()
      .subscribe(data => {
        this.mockDataIsLoaded = true;
        this.participants = data.sort((a, b) => (a.name < b.name) ? -1 : 1);
        this.dataSource = new MatTableDataSource<IParticipants>(data);
      }
      );
  }
}
