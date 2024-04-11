import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'A ocurrido un error inesperado: 404',
      buttons: [
        { text: 'Ok', handler: () => console.log('ALERTA CONFIRMADA') },
        { text: 'Cancelar', role: 'cancel', handler: () => console.log('ALERTA CANCELADA') }
      ]
    });
    alert.present();
  }

  async openToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async openPopover(e: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: e,
      side: 'top'
    });

    await popover.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }

}
