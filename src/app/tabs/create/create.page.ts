import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ComsumeService } from 'src/app/services/consume/comsume.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  form: FormGroup;
  constructor(
    private consumeService: ComsumeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      product: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  }

  createProduct() {
    const body = { name: this.form.controls['product'].value, description: this.form.controls['description'].value }
    this.consumeService.createProducts(body).subscribe({
      next: () => this.openToast('Producto creado con exito'),
      error: (err) => this.openAlert(err)
    })
  }

  async openToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }

  async openAlert(err: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'A ocurrido un error inesperado: ' + err.status,
      buttons: [
        { text: 'Ok' },
      ]
    });
    alert.present();
  }

}
