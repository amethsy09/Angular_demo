import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './beneficiary-form.html',
  styleUrl: './beneficiary-form.scss'
})
export class BeneficiaryFormComponent {

  beneficiaireAjoute = output<any>();

  beneficiaryForm = new FormGroup({

    nom: new FormControl('', [
      Validators.required
    ]),


    typeTransfert: new FormControl('SENEGAL_CASH', [
      Validators.required
    ]),


    identifiantDestination: new FormControl('')

  });



  ngOnInit() {

    this.ecouterTypeTransfert();

  }



  ecouterTypeTransfert() {

    this.beneficiaryForm
      .get('typeTransfert')
      ?.valueChanges
      .subscribe(type => {


        const identifiant =
          this.beneficiaryForm.get('identifiantDestination');


        if (!identifiant) return;



        if (type === 'INTERNATIONAL_CRYPTO') {


          identifiant.setValidators([

            Validators.required,

            Validators.pattern(/^0x[a-fA-F0-9]{40}$/)

          ]);


        } else {


          identifiant.clearValidators();


        }


        // Force Angular à recalculer les erreurs
        identifiant.updateValueAndValidity();


      });

  }



  enregistrerBeneficiaire() {

    if (this.beneficiaryForm.invalid) {

      this.beneficiaryForm.markAllAsTouched();
      return;

    }
    const beneficiaire = this.beneficiaryForm.value;
    // Envoi vers le parent
    this.beneficiaireAjoute.emit(beneficiaire);
    // Reset du formulaire
    this.beneficiaryForm.reset({
      typeTransfert: 'SENEGAL_CASH'
    });

  }


}