import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageParticipantsService } from '../../../../services/local-storage-participants.service';
import { IParticipants } from '../../../../models/IParticipants';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FormBuilder } from '@angular/forms';
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

  addParticipatsForm = this.formBuilder.group([]);
  displayedColumns: string[] = ['id', 'name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<IParticipants>();

  participants: IParticipants[] = [];

  loadFileIsVisible: boolean = true;
  showSuccessAlertMessage: boolean = false;
  showErrorAlertMessage: boolean = false;
  showWarningAlertMessage: boolean = true;

  constructor(
    private storageService: LocalStorageParticipantsService,
    private formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadParticipants();
  }

  createForm() {
    this.addParticipatsForm = this.formBuilder.group({
      id: new FormControl(0,),
      name: new FormControl('', Validators.required),
    });
  }

  private onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.canIShowSuccessAlertMessage();
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  onSubmit(): void {
    if (this.addParticipatsForm.valid) {
      Notify.success('Test Success ' + this.addParticipatsForm.value);
    } else {
      Notify.warning('Field name is require');
    }
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
        this.dataSource = new MatTableDataSource<IParticipants>(data);

        if (this.participants?.length > 0) {
          this.loadFileIsVisible = false;
        }
      }
      );
  }
}


/*
  <!-- Alerts -->
  <div *ngIf="showSuccessAlertMessage" class="success-alert-message">
    <h4>
      <alert type='success' dismissOnTimeout="7000">
        <strong>¡Éxito!</strong> Archivo cargado correctamente.
      </alert>
    </h4>
  </div>

  <div *ngIf="showErrorAlertMessage" class="error-alert-message">
    <h4>
      <alert type='danger' dismissOnTimeout="7000">
        <strong>¡Error!</strong> Algo no fue bien, verifique su conexión he intente nuevamente.
      </alert>
    </h4>
  </div>

  <div *ngIf="showWarningAlertMessage" class="warning-alert-message">
    <h4>
      <alert type='warning' dismissOnTimeout="7000" alertPosition="top-left">
        <strong>¡Advertencia!</strong> Algo no fue bien, verifique su conexión he intente nuevamente.
      </alert>
    </h4>
  </div>
*/
