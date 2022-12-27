import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IParticipants } from '../../../../models/IParticipants';
import { FileManagementService } from 'src/app/services/file/file-management.service';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subject, Subscription } from 'rxjs';
import { LocalStorageReferenceService } from 'src/app/services/localStore/local-storage-reference.service';

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
export class ParticipantsComponent implements OnInit, OnDestroy, AfterViewInit {

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
  subscription: Subscription;

  // numbers
  participantCounter: number;

  // booleans
  loadFileIsVisible: boolean;
  showSuccessAlertMessage: boolean;
  showErrorAlertMessage: boolean;
  showWarningAlertMessage: boolean;
  mockDataIsLoaded: Boolean;
  isUploadingFile: Boolean;

  public currentLang;

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _fileManagementService: FileManagementService,
    private _storageServiceTest: LocalStorageReferenceService) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'actions'];
    this.participantCounter = 1;
    this.loadFileIsVisible = true;
    this.showSuccessAlertMessage = false;
    this.showErrorAlertMessage = false;
    this.showWarningAlertMessage = true;
    this.mockDataIsLoaded = false;
    this.isUploadingFile = false;

    this.createForm();
    this.loadParticipants();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        if (onfulfilled) {
          this.clearTable();
        }
      },
      (onrejected) => {
      }
    );
  }

  public clearTable(): void {
    this.dataSource = new MatTableDataSource<IParticipants>();
    this.participants = [];
    this.participantCounter = 1;
    this.mockDataIsLoaded = false;
    this.addParticipantsForm.controls['name'].setValue('');
  }

  public onDownload(): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        this._notificationService.loadingStart();
        if (onfulfilled) {
          this._fileManagementService.Download(this.participants);
          this._notificationService.loadingStop();
        }
      },
      (onrejected) => {
        this._notificationService.loadingStop();
      }
    );
  }

  public onUpload(event: any): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        this._notificationService.loadingStart();
        this._fileManagementService.Upload(event)
          .then(
            (onfulfilled) => {
              if (onfulfilled) {
                var observable = this._storageService.getParticipantsFromLocalStorage();
                this.subscription = observable.subscribe(
                  (response) => {
                    this._notificationService.loadingStop();
                    console.log(response);
                  }
                );
              }
            },
            (onrejected) => {
              console.log(onrejected);
              this._notificationService.loadingStop();
            }
          )
        console.log(onfulfilled);
      },
      (onrejected) => {
        this._notificationService.loadingStop();
      })
  }

  public onSubmit(): void {
    debugger;
    if (this.addParticipantsForm.valid == true && this.addParticipantsForm.controls['name'].value != '') {
      const currentInputName = this.addParticipantsForm.controls['name'].value.toUpperCase();

      if (this.mockDataIsLoaded == true) {
        this.clearTable();
      }

      if (this.participants.find(x => x.name === currentInputName)) {
        this._notificationService.warning(`Name is already inserted ${currentInputName}`)
        return;
      }

      let newParticipant: IParticipants = {
        id: this.participantCounter,
        name: currentInputName
      };

      this._storageService.addParticipantsTest(newParticipant);




      this.participants.push(newParticipant);
      this.addParticipantsForm.controls['name'].setValue('');
      this.dataSource = new MatTableDataSource<IParticipants>(this.participants);
      this.participantCounter++;

    } else {
      this._notificationService.warning('¡Field is invalid!');
    }
  }

  public removeParticipants(): void {
    this._storageService.removeParticipants();
    this.loadParticipants();
    this.loadFileIsVisible = true;
    this.dataSource.connect
  }

  public removeParticipant(participant: IParticipants): void {
    console.log(participant);
  }

  public loadParticipants(): void {

    this._storageService.getParticipantsTest$().subscribe(participants => {
      this.participants = participants;
      this.dataSource = new MatTableDataSource<IParticipants>(participants);
    })

    if (this.participants.length === 0) {
      this._storageService.loadMockParticipantsToLocalStorage();
    }


    // this._storageService.getMockParticipants()
    //   .subscribe(data => {
    //     this.mockDataIsLoaded = true;
    //     this.participants = data.sort((a, b) => (a.name < b.name) ? -1 : 1);
    //     this.dataSource = new MatTableDataSource<IParticipants>(data);
    //   }
    //   );
  }
}
