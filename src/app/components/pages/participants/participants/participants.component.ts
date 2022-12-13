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
    this.loadFileIsVisible = true;
    this.createForm();
    this.loadParticipants();
  }

  createForm() {
    this.addParticipatsForm = this.formBuilder.group({
      id: new FormControl(0,),
      name: new FormControl('', Validators.required),
    });
  }

  onLoadFile(canIHideParticipantsLoader: boolean) {
    this.loadFileIsVisible = canIHideParticipantsLoader;
    this.canIShowSuccessAlertMessage();
    this.loadFileIsVisible = false;
    this.loadParticipants();
  }

  onDelete() {
    Notify.success('Looking good');
  }

  onUpload() {
    Notify.success('Looking good');
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
        }
      }
      );
  }
}
