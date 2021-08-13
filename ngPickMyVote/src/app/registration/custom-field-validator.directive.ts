import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appCustomFieldValidator]',
  providers: [ 
    {
      provide:NG_VALIDATORS, 
      useClass:CustomFieldValidatorDirective, 
      multi: true
    }]
})

export class CustomFieldValidatorDirective implements Validators {

  constructor() { }

  validate(form: FormGroup): ValidationErrors {
    if(!form.controls.password || !form.controls.cpassword) {
      
      return null as any;
    }

    if(Object.keys(form.controls.password.errors || []).filter(
      (u)=> u !== "compareFieldValodator"
      ).length > 0 || 
      Object.keys(form.controls.cpassword.errors || []).filter(
        (u)=> u !== "compareFieldValodator"
      ).length > 0 ){
     
        return null as any;
    }

    if(form.controls.password.value !== form.controls.cpassword.value) {
     
      // form.controls.password.setErrors({compareFieldValodator: true});
      form.controls.cpassword.setErrors({compareFieldValodator: true});
      return {compareFieldValodator: true};
    }

    if(form.controls.password.errors !=null && form.controls.password.hasError('compareFieldValodator')) {
     
      delete form.controls.password.errors['compareFieldValodator'];
      form.controls.password.setErrors(null);
    }

    if(form.controls.cpassword.errors !=null && form.controls.cpassword.hasError('compareFieldValodator')) {
     
      delete form.controls.cpassword.errors['compareFieldValodator'];
      form.controls.cpassword.setErrors(null);
    }


    return null as any;
  }

}
