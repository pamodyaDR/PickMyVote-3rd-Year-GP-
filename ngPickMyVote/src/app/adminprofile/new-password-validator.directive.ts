import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appNewPasswordValidator]',
  providers: [ 
    {
      provide:NG_VALIDATORS, 
      useClass:NewPasswordValidatorDirective, 
      multi: true
    }]
})
export class NewPasswordValidatorDirective {

  constructor() { }

  validate(form: FormGroup): ValidationErrors {
    if(!form.controls.newpassword || !form.controls.cpassword) {
      
      return null as any;
    }

    if(Object.keys(form.controls.newpassword.errors || []).filter(
      (u)=> u !== "compareFieldValodator"
      ).length > 0 || 
      Object.keys(form.controls.cpassword.errors || []).filter(
        (u)=> u !== "compareFieldValodator"
      ).length > 0 ){
     
        return null as any;
    }

    if(form.controls.newpassword.value !== form.controls.cpassword.value) {
     
      // form.controls.newpassword.setErrors({compareFieldValodator: true});
      form.controls.cpassword.setErrors({compareFieldValodator: true});
      return {compareFieldValodator: true};
    }

    if(form.controls.newpassword.errors !=null && form.controls.newpassword.hasError('compareFieldValodator')) {
     
      delete form.controls.newpassword.errors['compareFieldValodator'];
      form.controls.newpassword.setErrors(null);
    }

    if(form.controls.cpassword.errors !=null && form.controls.cpassword.hasError('compareFieldValodator')) {
     
      delete form.controls.cpassword.errors['compareFieldValodator'];
      form.controls.cpassword.setErrors(null);
    }

    return null as any;
  }

}
