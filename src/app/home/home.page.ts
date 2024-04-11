import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  binding: string = '';
  emailError: string = 'Campo de email no valido';
  passError: string = 'Campo de password no valido';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }

  logCompany() {
    console.log(this.binding);
  }

  logForm() {
    console.log(this.form);
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

}
