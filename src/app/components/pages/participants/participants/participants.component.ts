import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileManagementService } from 'src/app/services/file/file-management.service';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { IParticipant } from 'src/app/models/IParticipant';
import { TestService } from 'src/app/test.service';


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
  subscription: Subscription;

  // material variables
  testDataSourceParticipants = new MatTableDataSource<IParticipant>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IParticipant>();
  @ViewChild(MatSort) sort: MatSort;

  // form
  addParticipantsForm = this._formBuilder.group([]);

  // arrays
  displayedColumns: string[] = ['id', 'name', 'actions'];
  participants: IParticipant[] = [];

  // numbers
  participantCounter: number = 1;

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
    private _audioService: AudioService,
    private _audioServiceTest: TestService
  ) {
  }

  ngOnInit(): void {
    debugger;
    this.dataSource = new MatTableDataSource<IParticipant>();

    this.subscription = this._audioServiceTest.getParticipants$().subscribe(participants => {
      debugger;
      if (participants != null) {
        this.dataSource = new MatTableDataSource<IParticipant>(participants);
        this.dataSource.paginator = this.paginator;
        this.participants = participants;
      } else {
        this.dataSource = new MatTableDataSource<IParticipant>();
        this.dataSource.paginator = this.paginator;
        this.participants = [];
      }

    });

    this.addParticipantsForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(environment.NAME_FIELD_REGULAR_EXPRESSION)],),
    });

    this._audioServiceTest.loadParticipantsFromExistingStorage();
  }

  ngOnDestroy(): void {
    if (this.subscription != null && this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  private clearFieldsAndTable(): void {
    if (this.dataSource.data.length === 0) {
      this._notificationService.warning('There is nothing to delete')
      return;
    }

    this.dataSource = new MatTableDataSource<IParticipant>();
    this.dataSource.paginator = this.paginator;
    this.participants = [];
    this.participantCounter = 1;
    this.addParticipantsForm.controls['name'].setValue('');
    this._storageService.removeParticipants();
  }

  tableActionRemoveParticipants(participant: IParticipant): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        this._audioServiceTest.removeParticipant(participant);
      },
      (onrejected) => {
        console.log(onrejected);
      }
    );
  }

  circleAddParticipant(): void {
    debugger;
    if (this.addParticipantsForm.valid == true && this.addParticipantsForm.controls['name'].value != '') {

      const currentInputName = this.addParticipantsForm.controls['name'].value.toUpperCase();

      if (this.participants.find(x => x.name === currentInputName)) {
        this._notificationService.warning(`${currentInputName} is already inserted`);
        return;
      }

      this._audioServiceTest.addParticipant({ id: 0, name: currentInputName });

      this._notificationService.success(`¡${currentInputName} added successful!`);

      this._audioService.playSuccessSound();

      this.addParticipantsForm.controls['name'].setValue('');

    } else {
      this._notificationService.warning('¡Field is invalid!');
    }
  }

  circleOnLoadMockParticipants(): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        if (onfulfilled) {
          this.mockDataIsLoaded = true;
          this._audioServiceTest.loadMockParticipantsToLocalStorage();
        }
      },
      (onrejected) => {
        this.mockDataIsLoaded = false;
      }
    );
  }

  circleOnDownload(): void {
    if (this.dataSource.data.length == 0) {
      this._notificationService.warning('Participants table must have at least one participant')
    } else {
      this._notificationService.confirmActionAsync().then(
        (onfulfilled) => {
          this._notificationService.loadingStart();
          if (onfulfilled) {
            this._fileManagementService.download(this.dataSource.data);
            this._notificationService.loadingStop();
          }
        },
        (onrejected) => {
          console.log(onrejected);
          this._notificationService.loadingStop();
        }
      );
    }
  }

  circleOnUpload(event: any): void {
    this._notificationService.loadingStart();
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        this._fileManagementService.Upload(event)
          .then(
            (onfulfilled) => {
              this.mockDataIsLoaded = false;
              this._storageService.setModeAs(environment.PROD_MODE);
              this._notificationService.success("¡File has been added successfully!");
            },
            (onrejected) => {
              console.log(onrejected);
              this._notificationService.warning("Something went wrong, please check your file format and try again");
              this._notificationService.loadingStop();
            }
          )
      },
      (onrejected) => {
        console.log(onrejected);
        this._notificationService.loadingStop();
      })
    this._notificationService.loadingStop();
  }

  circleOnDelete(): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        if (onfulfilled) {
          this.clearFieldsAndTable();
        }
      },
      (onrejected) => {
        console.log(onrejected);
      }
    );
  }

}
