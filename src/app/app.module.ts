import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RifameParticipantsComponent } from './rifame-participants/rifame-participants.component';
import { RifameRafflesComponent } from './rifame-raffles/rifame-raffles.component';
import { RifameWinnersComponent } from './rifame-winners/rifame-winners.component';
import { RifameWelcomeComponent } from './rifame-welcome/rifame-welcome.component';
import { RifameNavBarComponent } from './rifame-nav-bar/rifame-nav-bar.component';
import { RifameBlurScreenWithCentralTextComponent } from './rifame-blur-screen-with-central-text/rifame-blur-screen-with-central-text.component';
import { RifameLoadFileComponent } from './rifame-load-file/rifame-load-file.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    RifameParticipantsComponent,
    RifameRafflesComponent,
    RifameWinnersComponent,
    RifameWelcomeComponent,
    RifameNavBarComponent,
    RifameBlurScreenWithCentralTextComponent,
    RifameLoadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: RifameWelcomeComponent},
        { path: 'rifame/participants', component: RifameParticipantsComponent},
        { path: 'rifame/raffles', component: RifameRafflesComponent},
        { path: 'rifame/winners', component: RifameWinnersComponent},
      ]
      ),
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
