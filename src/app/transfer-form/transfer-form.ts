import { Component, input } from '@angular/core';
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

  // Solde reçu du parent
  balance = input.required<number>();

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
    },
    {
      validators: (control) => this.soldeValidator(control)
    }
  );

  soldeValidator(control: AbstractControl): ValidationErrors | null {

    const montant = control.get('montant')?.value ?? 0;

    if (montant > this.balance()) {
      return {
        soldeInsuffisant: true
      };
    }

    return null;
  }

  onSubmit() {

    if (this.transferForm.valid) {
      console.log(this.transferForm.value);
    }

  }

}