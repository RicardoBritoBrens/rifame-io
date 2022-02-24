import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ParticipantsComponent } from './components/participants/participants.component';
import { RafflesComponent } from './components/raffles/raffles.component';
import { WinnersComponent } from './components/winners/winners.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/shared/navbar/navbar.component';
import { BlurScreenWithCentralTextComponent } from './components/winners/blur-screen-with-central-text/blur-screen-with-central-text.component';
import { LoadFileComponent } from './components/participants/load-file/load-file.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    RouterModule.forRoot(
      [
        { path: '', component: WelcomeComponent},
        { path: 'rifame/participants', component: ParticipantsComponent},
        { path: 'rifame/raffles', component: RafflesComponent},
        { path: 'rifame/winners', component: WinnersComponent},
      ]
      ),
    AlertModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
