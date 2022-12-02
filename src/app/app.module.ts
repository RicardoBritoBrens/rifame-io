import { AlertModule } from 'ngx-bootstrap/alert';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlurScreenWithCentralTextComponent } from './components/pages/winners/winners/blur-screen-with-central-text/blur-screen-with-central-text.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoadFileComponent } from './components/pages/participants/participants/load-file/load-file.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NavBarComponent } from './components/shared/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantsComponent } from './components/pages/participants/participants/participants.component';
import { RafflesComponent } from './components/pages/raffles/raffles/raffles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/pages/home/welcome/welcome.component';
import { WinnersComponent } from './components/pages/winners/winners/winners.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
@NgModule({
  declarations: [
    AppComponent,
    ParticipantsComponent,
    RafflesComponent,
    WinnersComponent,
    WelcomeComponent,
    NavBarComponent,
    BlurScreenWithCentralTextComponent,
    LoadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(
      [
        { path: '', component: WelcomeComponent },
        { path: 'rifame/participants', component: ParticipantsComponent },
        { path: 'rifame/raffles', component: RafflesComponent },
        { path: 'rifame/winners', component: WinnersComponent },
      ]
    ),
    AlertModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
