import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileManagementService } from 'src/app/services/file/file-management.service';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { IParticipants } from '../../../../models/IParticipants';
import { LocalStorageParticipantsService } from 'src/app/services/localStore/local-storage-participants.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/audio.service';


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
  isUploadingFile: Boolean;

  constructor(
    private _storageService: LocalStorageParticipantsService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _fileManagementService: FileManagementService,
    private _audioService: AudioService) {
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

    // this.dataSource.connect().subscribe(data => {
    //   console.log(`connect was connected, the data returned is: ${data}`)
    // });
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

  buildAddParticipantsForm(): void {
    this.addParticipantsForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(environment.NAME_FIELD_REGULAR_EXPRESSION)],),
    });
  }

  onLoadFile(canIHideParticipantsLoader: boolean): void {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  clearFieldsAndTable(): void {
    debugger;
    if (this.dataSource.data.length === 0) {
      this._notificationService.warning('There is nothing to delete')
      return;
    }

    this.dataSource = new MatTableDataSource<IParticipants>();
    this.dataSource.paginator = this.paginator;
    this.participants = [];
    this.participantCounter = 1;
    this.addParticipantsForm.controls['name'].setValue('');
    this._storageService.removeParticipants();
  }

  loadParticipants(): void {
    if (this.subscription === null || this.subscription === undefined) {
      this.subscription = this._storageService.getParticipants$().subscribe(participants => {
        this.dataSource = new MatTableDataSource<IParticipants>(participants);
        this.dataSource.paginator = this.paginator;
        this.participants = participants;
      })
    }

    // if (this.participants.length === 0) {
    //   this.mockDataIsLoaded = false
    //   this._storageService.setModeAs(environment.PROD_MODE);
    // }
  }

  addParticipant(): void {
    if (this.addParticipantsForm.valid == true && this.addParticipantsForm.controls['name'].value != '') {
      const currentInputName = this.addParticipantsForm.controls['name'].value.toUpperCase();

      if (this.participants.find(x => x.name === currentInputName)) {
        this._notificationService.warning(`${currentInputName} is already inserted`)
        return;
      }

      let newParticipant: IParticipants = {
        id: this.participants.length + 1,
        name: currentInputName
      };

      this._storageService.addParticipant(newParticipant);
      this._audioService.playSuccessSound();

      //this.participants.push(newParticipant);
      this.addParticipantsForm.controls['name'].setValue('');
      //this.dataSource = new MatTableDataSource<IParticipants>(this.participants);
      //this.dataSource.paginator = this.paginator;
      //this.participantCounter++;

    } else {
      this._notificationService.warning('¡Field is invalid!');
    }
  }

  removeParticipants(): void {
    this._storageService.removeParticipants();
    this.loadFileIsVisible = true;
  }

  tableActionRemoveParticipants(participant: IParticipants): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        this._storageService.removeParticipant(participant);
        console.log(onfulfilled);
      },
      (onrejected) => {
        console.log(onrejected);
      }
    );
  }

  onLoadMockParticipants() {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        if (this.subscription === null || this.subscription === undefined) {
          this.subscription = this._storageService.getParticipants$().subscribe(participants => {

            this.dataSource = new MatTableDataSource<IParticipants>(participants);
            this.dataSource.paginator = this.paginator;
            this.participants = participants;
          })
        }

        this.mockDataIsLoaded = true
        this._storageService.setModeAs(environment.DEMO_MODE);
        this._storageService.loadMockParticipantsToLocalStorage();
        console.log(onfulfilled);
      },
      (onrejected) => {

        console.log(onrejected);
      }
    );
  }

  onDownload(): void {
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
          this._notificationService.loadingStop();
        }
      );
    }
  }

  onUpload(event: any): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {

        this._fileManagementService.Upload(event)
          .then(
            (onfulfilled) => {

              this._storageService.getParticipants$().subscribe(participants => {
                this.dataSource = new MatTableDataSource<IParticipants>(participants);
                this.dataSource.paginator = this.paginator;
              });
              this.mockDataIsLoaded = false;
              this._storageService.setModeAs(environment.PROD_MODE);
              this._notificationService.loadingStart();


              this._notificationService.success("Archivo cargado correctamente");
              console.log(onfulfilled);
              this._notificationService.loadingStop();
            },
            (onrejected) => {

              this._notificationService.warning("Algo fue mal, verifique el formato de su archivo");
              console.log(onrejected);
              this._notificationService.loadingStop();
            }
          )
      },
      (onrejected) => {

        console.log(onrejected);
        //this._notificationService.loadingStop();
      })
  }

  onDelete(): void {
    this._notificationService.confirmActionAsync().then(
      (onfulfilled) => {
        if (onfulfilled) {
          console.log(onfulfilled);
          this.clearFieldsAndTable();
        }
      },
      (onrejected) => {
        console.log(onrejected)
      }
    );
  }

}
