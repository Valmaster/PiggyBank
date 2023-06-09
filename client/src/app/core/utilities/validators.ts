import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {InjectorService} from '../services/injector.service';
import {map, take, tap} from 'rxjs/operators';
import {isEmpty, isBoolean} from './checker';
import {PublicResolver} from 'core/api/public/public.resolver';

export class Validators {

  static required(error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmpty(control.value)
        ? {required: error || 'Ce champs est requis.'}
        : null;
    };
  }

  static requiredTrue(error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !(isBoolean(control.value) && control.value === true)
        ? {requiredTrue: error || 'Cette case doit etre cochée.'}
        : null;
    };
  }

  static isEmail(error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = '^[\\w\\-\\+]+(\\.[\\w\\-]+)*@[\\w\\-]+(\\.[\\w\\-]+)*\\.[\\w\\-]{2,4}$';
      return !isEmpty(control.value) && !(new RegExp(pattern).test(control.value))
        ? {isEmail: error || 'Ceci n\'est pas une adresse email valide.'}
        : null;
    };
  }

  static alphanum(error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = '^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_-\\s]+$';
      return !isEmpty(control.value) && !(new RegExp(pattern).test(control.value))
        ? {alphanum: error || 'Ce champs comporte des caractères interdits.'}
        : null;
    };
  }

  static alphanumNospace(error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = '^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_-]+$';
      return !isEmpty(control.value) && !(new RegExp(pattern).test(control.value))
        ? {alphanumNospace: error || 'Ce champs comporte des caractères interdits.'}
        : null;
    };
  }

  static pattern(pattern: string | RegExp, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && !(new RegExp(pattern).test(control.value))
        ? {pattern: error || 'Ce champs est invalide.'}
        : null;
    };
  }

  static min(min: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && control.value < min
        ? {min: error || `Doit être supérieur ou égale à ${min}.`}
        : null;
    };
  }

  static max(max: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && control.value > max
        ? {max: error || `Doit être inférieur ou égale à ${max}.`}
        : null;
    };
  }

  static minLength(minLength: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && control.value.length < minLength
        ? {minLength: error || `Ce champs doit comporter au minimum ${minLength} caractères.`}
        : null;
    };
  }

  static maxLength(maxLength: number, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && control.value.length > maxLength
        ? {maxLength: error || `Ce champs ne peut pas dépasser ${maxLength} caractères.`}
        : null;
    };
  }

  static minDate(minDate: Date, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && new Date(control.value) < minDate
        ? {minDate: error || `Cette date doit être supérieur ou égale à ${minDate.toLocaleDateString()}.`}
        : null;
    };
  }

  static maxDate(maxDate: Date, error?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !isEmpty(control.value) && new Date(control.value) > maxDate
        ? {maxDate: error || `Cette date doit être inférieur ou égale à ${maxDate.toLocaleDateString()}.`}
        : null;
    };
  }

  static emailExists(error?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const publicResolver: PublicResolver = InjectorService.injector.get(PublicResolver);
      return publicResolver.emailExists({email: control.value}).pipe(
        take(1),
        map(({data}) => data && data.emailExists
          ? {emailExists: error || 'Cette adresse email est déjà utilisée.'}
          : null
        )
      );
    };
  }
}

