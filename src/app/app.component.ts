import { Component } from '@angular/core';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
  data = this.signalrService.botdata;
  rightMotor: () => boolean[] = () => this.setMotorSpeed(this.signalrService.botdata?.motorsSpeed ?? 0);
  leftMotor: () => boolean[] = () => this.setMotorSpeed(this.signalrService.botdata?.motorsSpeed ?? 0);


  constructor(public signalrService: SignalrService) {
     this.signalrService.connect();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  private setMotorSpeed(speed: number): boolean[] {
    let motor = new Array(5).fill(true);
    let amount = Math.round(speed / 20);
    for (let i = 0; i < amount; i++) {
      motor[motor.length-1-i] = false;
    }
    return motor;
  }
}
