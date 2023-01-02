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
import { Subscription } from 'rxjs';
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

  // subscriptions
  mockSubscriptionsParticipants: Subscription;

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

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _fileManagementService: FileManagementService,
    private _storageServiceTest: LocalStorageReferenceService) {
  }

  ngOnInit(): void {

    // set default values
    this.displayedColumns = ['id', 'name', 'actions'];
    this.participantCounter = 1;
    this.loadFileIsVisible = true;
    this.showSuccessAlertMessage = false;
    this.showErrorAlertMessage = false;
    this.showWarningAlertMessage = true;
    this.mockDataIsLoaded = false;
    this.isUploadingFile = false;

    this.buildAddParticipantsForm();
  }

  ngOnDestroy(): void {
    if (this.subscription != null && this.subscription != undefined) {
      this.subscription.unsubscribe();
    }

    if (this.mockSubscriptionsParticipants != null && this.mockSubscriptionsParticipants != undefined) {
      this.mockSubscriptionsParticipants.unsubscribe();
    }

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buildAddParticipantsForm(): void {
    this.addParticipantsForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  onLoadFile(canIHideParticipantsLoader: boolean): void {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  onDelete(): void {
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

  clearTable(): void {
    this.dataSource = new MatTableDataSource<IParticipants>();
    this.participants = [];
    this.participantCounter = 1;
    this.mockDataIsLoaded = false;
    this.addParticipantsForm.controls['name'].setValue('');
  }

  onDownload(): void {
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

  onUpload(event: any): void {
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

  addParticipant(): void {
    if (this.addParticipantsForm.valid == true && this.addParticipantsForm.controls['name'].value != '') {
      const currentInputName = this.addParticipantsForm.controls['name'].value.toUpperCase();

      if (this.mockDataIsLoaded == true) {
        this.clearTable();
      }

      if (this.participants.find(x => x.name === currentInputName)) {
        this._notificationService.warning(`${currentInputName} is already inserted`)
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

  removeParticipants(): void {
    this._storageService.removeParticipants();
    // TODO: CHECK PARTICIPANTS BEEN LOADED REMEMBER THAT AT THIS POINT THE USER IS EDITING HIS DATA AND DO NOW WANT MOCK DATA UNTIL THE USER LOAD BY HIS OWN WILL

    this.loadParticipants();
    this.loadFileIsVisible = true;
    this.dataSource.connect
  }

  removeParticipant(participant: IParticipants): void {
    this._storageService.removeParticipant(participant);
  }

  loadMockParticipants() {
    this.mockSubscriptionsParticipants = this._storageService.getParticipantsTest$().subscribe(participants => {
      this.dataSource = new MatTableDataSource<IParticipants>(participants);
      this.dataSource.paginator = this.paginator;
    })

    if (this.participants.length === 0) {
      this._storageService.loadMockParticipantsToLocalStorage();
    }
  }

  loadParticipants(): void {
    this._storageService.getParticipantsTest$().subscribe(participants => {
      this.dataSource = new MatTableDataSource<IParticipants>(participants);
      this.dataSource.paginator = this.paginator;
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
