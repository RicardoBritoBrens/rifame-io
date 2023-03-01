import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  public playSuccessSound = () => this.loadAndPlayAudio('success');

  public playSound = (name) => this.loadAndPlayAudio(name);

  private loadAndPlayAudio(name: string) {
    const audio = new Audio();
    audio.autoplay = true;
    audio.src = `${environment.SERVER_URL}/assets/sounds/${name}.mp3`;
    audio.load();
    audio.play();
  }
}
