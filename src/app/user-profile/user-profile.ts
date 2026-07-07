import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfileComponent {
  profilModifie = output<any>();
  profileForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  onSubmit() {

    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();
      return;

    }
    this.profilModifie.emit(
      this.profileForm.value
    );

  }

}