import {Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {

  popup: string;

  togglePopUp(popup: string): void {
    this.popup = popup === this.popup ? null : popup;
  }

}
