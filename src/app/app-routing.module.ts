import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/pages/home/welcome/welcome.component';
import { ParticipantsComponent } from './components/pages/participants/participants/participants.component';
import { RafflesComponent } from './components/pages/raffles/raffles/raffles.component';
import { WinnersComponent } from './components/pages/winners/winners/winners.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'rifame/participants', component: ParticipantsComponent },
  { path: 'rifame/raffles', component: RafflesComponent },
  { path: 'rifame/winners', component: WinnersComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
