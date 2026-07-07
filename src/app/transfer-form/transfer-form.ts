import { Component, input, effect } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.scss'
})
export class TransferFormComponent {

  balance = input<number>(0);

  transferForm = new FormGroup(
    {
      compteCible: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12)
      ]),

      montant: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ])
    }
  );


  constructor() {

    effect(() => {

      this.balance();

      this.transferForm.setValidators(
        (control) => this.soldeValidator(control)
      );

      this.transferForm.updateValueAndValidity();

    });

  }


  soldeValidator(control: AbstractControl): ValidationErrors | null {

    const montant = Number(control.get('montant')?.value ?? 0);

    if (montant > this.balance()) {
      return {
        soldeInsuffisant: true
      };
    }

    return null;
  }


  onSubmit() {

    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    console.log(this.transferForm.value);
  }

}