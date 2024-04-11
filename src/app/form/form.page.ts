import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      terms: [false, Validators.compose([
        Validators.requiredTrue
      ])],
      terms2: [false, Validators.compose([
        Validators.requiredTrue
      ])],
      radio: [null, Validators.compose([
        Validators.required
      ])],
      select: [[], Validators.compose([
        Validators.required
      ])]
    })
  }

  ngOnInit() {
  }

  logForm() {
    console.log('CHECKBOX: ', this.form.controls['terms']);
    console.log('TOOGLE: ', this.form.controls['terms2']);
    console.log('RADIO: ', this.form.controls['radio']);
    console.log('SELECT: ', this.form.controls['select']);
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

}
