import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { IParticipants } from '../../../../models/IParticipants';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { FileManagementService } from 'src/app/services/file/file-management.service';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


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

  // material variables
  testDataSourceParticipants = new MatTableDataSource<IParticipants>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<IParticipants>();

  // form
  addParticipantsForm = this._formBuilder.group([]);

  // arrays
  displayedColumns: string[] = [];
  participants: IParticipants[] = [];

  // numbers
  participantCounter: number;

  // booleans
  loadFileIsVisible: boolean;
  showSuccessAlertMessage: boolean;
  showErrorAlertMessage: boolean;
  showWarningAlertMessage: boolean;
  mockDataIsLoaded: Boolean;

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _fileManagementService: FileManagementService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'name'];
    this.participantCounter = 1;
    this.loadFileIsVisible = true;
    this.showSuccessAlertMessage = false;
    this.showErrorAlertMessage = false;
    this.showWarningAlertMessage = true;
    this.mockDataIsLoaded = false;

    this.createForm();
    this.loadParticipants();
  }

  public createForm(): void {
    this.addParticipantsForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  public onLoadFile(canIHideParticipantsLoader: boolean): void {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  public onDelete(): void {
    this._notificationService.confirmAction(() => this.clearTable());
  }

  public clearTable(): void {
    this.dataSource = new MatTableDataSource<IParticipants>();
    this.participants = [];
    this.participantCounter = 1;
    this.mockDataIsLoaded = false;
    this.addParticipantsForm.controls['name'].setValue('');
  }

  public onDownload(): void {
    this._notificationService.confirmAction(() => this._fileManagementService.Download(this.participants));
  }

  public onUpload(event: any): void {
    this._notificationService.confirmAction(() => this._fileManagementService.Upload(event));
    this._storageService.getAllParticipantsFromLocalStorage().subscribe(
      (response) => {
        debugger;
        console.log(response);
      }
    )
  }

  public onSubmit(): void {
    if (this.addParticipantsForm.valid == true && this.addParticipantsForm.controls['name'].value != '') {

      const currentInputName = this.addParticipantsForm.controls['name'].value;
      if (this.mockDataIsLoaded == true) {
        this.clearTable();
      }

      if (this.participants.find(x => x.name === currentInputName)) {
        this._notificationService.warning(`Name is already inserted ${currentInputName}`)
      }

      let newParticipant: IParticipants = {
        id: this.participantCounter,
        name: currentInputName
      };

      this.participants.push(newParticipant);
      this.dataSource = new MatTableDataSource<IParticipants>(this.participants);
      this.participantCounter++;

    } else {
      this._notificationService.warning('Field name is require');
    }
  }

  public removeParticipants(): void {
    this._storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
    this.dataSource.connect
  }

  public loadParticipants(): void {
    this._storageService.getMockAllParticipantsFromLocalStorage()
      .subscribe(data => {
        this.mockDataIsLoaded = true;
        this.participants = data.sort((a, b) => (a.name < b.name) ? -1 : 1);
        this.dataSource = new MatTableDataSource<IParticipants>(data);
      }
      );
  }
}
