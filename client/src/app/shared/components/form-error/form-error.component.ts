import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html'
})

export class FormErrorComponent {
  @Input() control: FormControl | AbstractControl;
  values = Object.values;
}
